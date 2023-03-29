const pool = require('../../lib/db')
const camelize = require('camelize')

class AdminsService {
  constructor () {
    this.pool = pool
  }
  async getById (id) {
    const sql = `SELECT * FROM admins WHERE id = ?`
    const [rows,fields] = await this.pool.query(sql, [id])
    return rows.length ? camelize(rows[0]) : null
  }
  /**
   * @param {string} email
   * @return {Promise<*>}
   */
  async getByActiveEmail (email) {
    const sql = `SELECT * FROM admins WHERE email = ? AND is_active = 1`
    const [rows,fields] = await this.pool.query(sql, [email]);
    return rows.length ? camelize(rows[0]) : null
  }

  async getByEmail (email) {
    const sql = `SELECT * FROM admins WHERE email = ?`
    const [rows, fields] = await this.pool.query(sql, [email]);
    return rows.length ? camelize(rows[0]) : null
  }
  /**
   * Updates the lastLogin Timestamp
   * @param {int} adminId
   * @return {Promise<*>}
   */
  async updateLastLogin (adminId) {
    const sql = `UPDATE admins SET last_login = CURRENT_TIMESTAMP WHERE id = ?`
    await this.pool.query(sql, [adminId])
  }
   /**
   * @return {Promise<*>}
   */
   async getList () {
    const sql = `SELECT * FROM admins ORDER BY id ASC`
    const [rows,fields] = await this.pool.query(sql);
    return rows.length ? camelize(rows) : []
  }
}

module.exports = AdminsService
