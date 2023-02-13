const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('hwschools', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
})

try {
    sequelize.authenticate()
    console.log('logado com sucesso')
}catch(err){
   console.log(`falha na conexão: ${err}`)
}

module.exports = sequelize;

//Crie o banco de dados