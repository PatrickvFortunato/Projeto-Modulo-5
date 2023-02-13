const Alunos = require('../models/Alunos')
const Professores = require('../models/Professores')

const bcrypt = require('bcryptjs')

module.exports = class AuthController {

    static loginAluno(req, res) {
        res.render('auth/loginAlunos')
    }

    static loginProfessor(req, res) {
        res.render('auth/loginProf')
    }

    static async loginAlunoPost(req, res) {
        const { email, senha } = req.body

        //encontrando usuário 
        const aluno = await Alunos.findOne({ where: { email: email } })

        if (!aluno) {
            req.flash('message', 'usuário não encontrado')
            res.render('auth/loginAlunos')

            return
        }

        //conferindo as senhas 
        const passwordMatch = bcrypt.compareSync(senha, aluno.senha)

        if (!passwordMatch) {
            req.flash('message', 'senha invalida, por favor, tente novamente!')
            res.render('auth/loginAlunos')

            return
        }

        //initialize session
        req.session.userid = aluno.id

        req.flash('message', "autenticação realizada com sucesso!")
        req.session.save(() => {
            res.redirect('/')
        })
    }

    static async loginProfessorPost(req, res) {
        const { email, senha } = req.body

        //encontrando usuário 
        const professor = await Professores.findOne({ where: { email: email } })

        if (!professor) {
            req.flash('message', 'usuário não encontrado')
            res.render('auth/loginProf')

            return
        }

        //conferindo as senhas 
        const passwordMatch = bcrypt.compareSync(senha, professor.senha)

        if (!passwordMatch) {
            req.flash('message', 'senha invalida, por favor, tente novamente!')
            res.render('auth/loginProf')

            return
        }

        //initialize session
        req.session.userid = professor.id

        req.flash('message', "autenticação realizada com sucesso!")
        req.session.save(() => {
            res.redirect('/')
        })
    }

    static registerAluno(req, res) {
        res.render('auth/registerAlunos')
    }

    static registerProfessor(req, res) {
        res.render('auth/registerProf')
    }

    static async registerAlunoPost(req, res) {
        const { nome, sobrenome, celular, serie, email, senha, confirmpassword } = req.body

        //validação de senhas
        if (senha != confirmpassword) {
            req.flash('message', 'As Senhas não conferem, tente novamente!')
            res.render('auth/registerAlunos')

            return
        }

        //checagem de usuários
        const checkIfUserExists = await Alunos.findOne({ where: { email: email } })

        if (checkIfUserExists) {
            req.flash('message', 'Usuario já cadastrado!')
            res.render('auth/registerAlunos')

            return
        }

        //create a password
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(senha, salt)

        const user = {
            nome,
            sobrenome,
            celular,
            serie,
            email,
            senha: hashedPassword
        }

        try {
            const createdUser = await Alunos.create(user)

            // initialize session
            req.session.userid = createdUser.id

            req.flash('message', 'Cadastro Realizado com sucesso!')

            req.session.save(() => {
                res.redirect('/')
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    static async registerProfessorPost(req, res) {
        const { nome, sobrenome, celular, serie, disciplina, email, senha, confirmpassword } = req.body

        //validação de senhas
        if (senha != confirmpassword) {
            req.flash('message', 'As Senhas não conferem, tente novamente!')
            res.render('auth/registerProf')

            return
        }

        //checagem de usuários
        const checkIfUserExists = await Professores.findOne({ where: { email: email } })

        if (checkIfUserExists) {
            req.flash('message', 'Usuario já cadastrado!')
            res.render('auth/registerProf')

            return
        }

        //create a password
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(senha, salt)

        const user = {
            nome,
            sobrenome,
            celular,
            serie,
            disciplina,
            email,
            senha: hashedPassword
        }

        try {
            const createdUser = await Professores.create(user)

            // initialize session
            req.session.userid = createdUser.id

            req.flash('message', 'Cadastro Realizado com sucesso!')

            req.session.save(() => {
                res.redirect('/')
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    static logout(req, res) {
        req.session.destroy()
        res.redirect('/')
    }

}