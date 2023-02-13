const { DataTypes } = require('sequelize');
const db = require('../db/conn')

const TarefasAlunos = db.define('TarefasAlunos', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
})

module.exports = TarefasAlunos;