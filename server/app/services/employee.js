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

}

module.exports = EmployeeServices;