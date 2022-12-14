var env = process.env

const knex = require('knex')({
    client:'mysql',
    client:'mysql2',
    version:'8.0.29',
    connection:{
        host:env.MYSQL_HOST,
        port:env.MYSQL_PORT,
        user:env.MYSQL_USER,
        password:env.MYSQL_PASSWORD,
        database:env.MYSQL_DATABASE
    },
    pool:{min:0,max:5}
})
module.exports = knex