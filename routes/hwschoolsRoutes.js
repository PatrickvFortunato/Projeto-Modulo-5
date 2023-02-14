const express = require('express')
const router = express.Router()
const Controller = require('../controllers/Controller.js')

//helpers
const checkAuth = require('../helpers/auth').checkAuth 

router.get('/add', checkAuth, Controller.createTarefas)
router.post('/add', checkAuth, Controller.createTarefasSave)
router.get('/edit/:id', checkAuth, Controller.updateTarefas)
router.post('/edit', checkAuth, Controller.updateTarefasSave)
router.get('/tarefas', checkAuth, Controller.tarefas)
router.get('/tarefasAluno', checkAuth, Controller.tarefasAluno)
router.post('/remove', checkAuth, Controller.removeTarefas)
router.get('/', Controller.showTarefas)


module.exports = router