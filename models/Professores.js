const { DataTypes } = require('sequelize')

const db = require('../db/conn');

const Professores = db.define('Professores', {
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
    disciplina: {
        type: DataTypes.STRING,
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


module.exports = Professores