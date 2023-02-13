const { DataTypes } = require('sequelize')

const db = require('../db/conn')
const Professores = require('./Professores')
const ProfessorAlunos = require('./ProfessorAlunos')

const Alunos = db.define('Alunos', {
    nome: {
        type: DataTypes.STRING,
        require: true,
        allowNull: false,
    },
    sobrenome: {
        type: DataTypes.STRING,
        require: true,
        allowNull: false,
    },
    celular: {
        type: DataTypes.INTEGER,
        require: true,
        allowNull: false,
    },
    serie: {
        type: DataTypes.INTEGER,
        require: true,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        require: true,
        allowNull: false,
    },
    senha: {
        type: DataTypes.STRING,
        require: true,
        allowNull: false,
    },
})

Alunos.belongsToMany(Professores, {
    through: {
        model: ProfessorAlunos
    },
    constrait: true
})

Professores.belongsToMany(Alunos, {
    through: {
        model: ProfessorAlunos
    },
    constrait: true
})


Alunos.hasMany(ProfessorAlunos);
ProfessorAlunos.belongsTo(Alunos);
Professores.hasMany(ProfessorAlunos);
ProfessorAlunos.belongsTo(Professores);

module.exports = Alunos