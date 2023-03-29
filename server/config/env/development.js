module.exports = {
    log: {
      syslog: { active: false },
      console: { active: true }
    },
    mysql: {
      host: 'localhost',
      user: 'dev',
      password: 'password',
      database: 'gpscheckin',
      connectionLimit: 10
    },
    redis: {
      host: 'localhost'
    },
    session: {
      cookie: {
        name: 'sp_team_dev.sid',
      }
    }
  }