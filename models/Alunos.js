const { DataTypes } = require('sequelize')

const db = require('../db/conn')

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



module.exports = Alunos