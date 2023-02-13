const session = require('express-session')
const Professores = require('../models/Professores')
const Tarefas = require('../models/Tarefas')
const Alunos = require('../models/Alunos')
const { Op } = require('sequelize')

module.exports = class Controller {

    static async showTarefas(req, res) {

        let search = ''

        if (req.query.search) {
            search = req.query.search
        }

        let order = 'DESC'

        if (req.query.order === 'old') {
            order = 'ASC'
        } else {
            order = 'DESC'
        }

        const tarefasData = await Tarefas.findAll({
            include: Professores,
            where: {
                titulo: { [Op.like]: `%${search}%` },
            },
            order: [['createdAt', order]]
        })

        const tarefas = tarefasData.map((result) => result.get({ plain: true }))

        let tarefasQty = tarefas.length

        if (tarefasQty === 0) {
            tarefasQty = false
        }

        res.render('hwschools/home', { tarefas, search, tarefasQty })
    }

    static async tarefas(req, res) {
        const userId = req.session.userid;
        console.log(userId);

        const professor = await Professores.findOne({
            where: {
                id: userId,
            },
            include: Tarefas,
            plain: true,
        })

        if (!professor) {
            res.redirect('/login')
        }

        const tarefas = professor.Tarefas.map((result) => result.dataValues)
        console.log(tarefas);
       

        let emptyTarefas = false

        if (tarefas.length === 0) {
            emptyTarefas = true
        }

        res.render('hwschools/tarefas', { tarefas, emptyTarefas, userId })
    }

    static createTarefas(req, res) {
        //const userId = req.session.userid;
        res.render('hwschools/create')
    }

    static async createTarefasSave(req, res) {
        const { titulo, disciplina, descricao } = req.body
        const userId = req.session.userid;
        try {
            await Tarefas.create({
                titulo,
                disciplina,
                descricao,
                IdProfessor: userId
            })

            req.flash('message', 'Tarefa criada com sucesso!')

            req.session.save(() => {
                res.redirect('/hwschools/tarefas')
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async updateTarefas(req, res) {
        const id = req.params.id
        const tarefa = await Tarefas.findOne({ where: { id: id }, raw: true })

        res.render('hwschools/edit', { tarefa })
    }

    static async updateTarefasSave(req, res) {
        const { id, titulo, disciplina, descricao } = req.body

        const tarefa = {
            titulo,
            disciplina,
            descricao
        }

        try {
            await Tarefas.update(tarefa, { where: { id: id } })

            req.flash('message', 'Tarefa atualizada com sucesso')

            req.session.save(() => {
                res.redirect('/hwschools/tarefas')
            })

        } catch (error) {
            console.log(error)
        }
    }

    static async removeTarefas(req, res) {
        const id = req.body.id;
        const UserId = req.session.userid;

        try {
            await Tarefas.destroy({ where: { id: id, IdProfessor: UserId } })

            req.flash('message', 'Tarefa removida com sucesso!')

            req.session.save(() => {
                res.redirect('/hwschools/tarefas')
            })
        } catch (error) {
            console.log(error)
        }
    }

    /*static async tarefasAluno(req, res) {
        const userId = req.session.userid;

        const aluno = await Alunos.findOne({
            where: {
                id: userId,
            },
            include: Tarefas,
            plain: true,
        })

        if (!aluno) {
            res.redirect('/login')
        }

        const tarefas = professor.Tarefas.map((result) => result.dataValues)
        console.log(tarefas);
       

        let emptyTarefas = false

        if (tarefas.length === 0) {
            emptyTarefas = true
        }

        res.render('hwschools/tarefas', { tarefas, emptyTarefas })
    }*/
}
