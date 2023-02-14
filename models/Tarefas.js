const { DataTypes } = require('sequelize')

const db = require('../db/conn');
const Professores = require('./Professores');
const Alunos = require('./Alunos');
const TarefasAlunos = require('./TarefasAlunos');


const Tarefas = db.define('Tarefas', {
    titulo: {
        type: DataTypes.STRING,
        require: true,
        allowNull: false,
    },
    serie: {
        type: DataTypes.INTEGER,
        require: true,
        allowNull: false,
    },
    disciplina: {
        type: DataTypes.STRING,
        require: true,
        allowNull: false,
    },
    descricao: {
        type: DataTypes.STRING,
        require: true,
        allowNull: false,
    },
})

Tarefas.belongsTo(Professores);
Professores.hasMany(Tarefas);

Tarefas.belongsToMany(Alunos, {
    through: {
        model: TarefasAlunos
    }
})

Alunos.belongsToMany(Tarefas, {
    through: {
        model: TarefasAlunos
    }
})


Alunos.hasMany(TarefasAlunos);
TarefasAlunos.belongsTo(Alunos);
Tarefas.hasMany(TarefasAlunos);
TarefasAlunos.belongsTo(Tarefas);


module.exports = Tarefas
