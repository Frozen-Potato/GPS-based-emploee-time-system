const pool = require('../../lib/db')
const camelize = require('camelize')

class EmployeeServices {
  constructor () {
    this.pool = pool
  }

  async getList(){
    const sql = `SELECT * FROM employee ORDER BY id ASC`
    const [rows,fields] = await this.pool.query(sql);
    return rows.length ? camelize(rows) : []
  }

  async getPasswordfromEmail(email){
    const sql = `SELECT * FROM employee WHERE email = ?`
    const [rows, fields] = await this.pool.query(sql, [email]);
    return rows.length ? rows[0] : null
  }

}

module.exports = EmployeeServices;