const mysql = require('mysql2/promise');
const config = require('../config');

const pool = mysql.createPool({
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
  connectionLimit: config.mysql.connectionLimit,
  timezone: 'Z'
})

module.exports = pool