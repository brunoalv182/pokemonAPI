const dataBaseConfig = require('./knexFile')
const knex = require('knex')

const dataBaseConnection = knex(dataBaseConfig)

module.exports = {
    dataBaseConnection
}