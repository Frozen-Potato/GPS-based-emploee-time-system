const pool = require('../../lib/db')
const camelize = require('camelize')

class SettingServices {
  constructor () {
    this.pool = pool
  }

  async getLocation(){
    const sql = `SELECT * FROM settings WHERE id = 1`
    const [rows, fields] = await this.pool.query(sql);
    return rows.length ? rows : [];
  }

}

module.exports = SettingServices;