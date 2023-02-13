const { DataTypes } = require('sequelize');
const db = require('../db/conn')

const ProfessorAlunos = db.define('ProfessorAlunos', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
})

module.exports = ProfessorAlunos;