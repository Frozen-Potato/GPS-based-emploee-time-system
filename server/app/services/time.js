const pool = require('../../lib/db')
const camelize = require('camelize')

class TimeServices {
  constructor () {
    this.pool = pool
  }

  async getList(){
    const sql = `SELECT * FROM employee_checkin_time ORDER BY id ASC`
    const [rows,fields] = await this.pool.query(sql);
    return rows.length ? camelize(rows) : []
  }

  async getDataFromEmployeeId(id){
    const sql = `SELECT * FROM employee_checkin_time WHERE employee_id = ?`
    const [rows, fields] = await this.pool.query(sql, [id]);
    return rows.length ? rows : null;
  }

  async insertData(employeeId, type, time, customTime){
    const sql = `INSERT INTO employee_checkin_time (employee_id, type, time, custom_time) VALUES (?,?,?,?)`
    await this.pool.query(sql, [employeeId, type, time, customTime]);
  }
}

module.exports = TimeServices;