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

Tarefas.belongsTo(Professores, {
    constraints:true,
    foreignKey: 'idProfessor'
});
Professores.hasMany(Tarefas, {
    foreignKey: 'idProfessor'
});

/*Alunos.belongsToMany(Tarefas, {
    through: {
        model: TarefasAlunos
    },
    foreignKey: 'idAluno',
    constrait: true
})

Tarefas.belongsToMany(Alunos, {
    through: {
        model: TarefasAlunos
    },
    foreignKey: 'idTarefa',
    constrait: true
})


Alunos.hasMany(TarefasAlunos, { foreignKey: 'idAluno' });
TarefasAlunos.belongsTo(Alunos, { foreignKey: 'idAluno' });
Tarefas.hasMany(TarefasAlunos, { foreignKey: 'idTarefa' });
TarefasAlunos.belongsTo(Tarefas, { foreignKey: 'idTarefa' });*/

module.exports = Tarefas
