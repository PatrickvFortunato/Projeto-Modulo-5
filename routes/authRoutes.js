const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/AuthController')

router.get('/login/aluno', AuthController.loginAluno)
router.get('/login/professor', AuthController.loginProfessor)
router.post('/login/aluno', AuthController.loginAlunoPost)
router.post('/login/professor', AuthController.loginProfessorPost)
router.get('/cadastro/aluno', AuthController.registerAluno)
router.get('/cadastro/professor', AuthController.registerProfessor)
router.post('/cadastro/aluno', AuthController.registerAlunoPost)
router.post('/cadastro/professor', AuthController.registerProfessorPost)

router.get('/logout', AuthController.logout)

module.exports = router