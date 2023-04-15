module.exports = {
    env: {
      doc: 'The applicaton environment.',
      format: ['development'],
      default: 'development',
      env: 'NODE_ENV',
      arg: 'node-env'
    },
    stage: {
      doc: 'Current stage.',
      format: ['development'],
      default: 'development',
      env: 'STAGE',
    },
    service_name: {
      doc: 'Name of this service',
      format: String,
      default: 'GPS-based Time Check',
      env: 'SERVICE_NAME'
    },
    plausible: {
      apiKey: {
        doc: 'plausible api key',
        format: '*',
        default: null,
        env: 'PLAUSIBLE_API_KEY',
      },
    },
    server: {
      port: {
        doc: 'port to listen to',
        format: 'port',
        default: 3001,
        env: 'PORT'
      }
    },
    log: {
      console: {
        active: {
          doc: 'Log to console?',
          format: Boolean,
          default: false,
          env: 'LOG_TO_CONSOLE'
        },
        level: {
          doc: 'Console Log Level',
          format: ['debug', 'info', 'warn', 'error', 'fatal'],
          default: 'debug',
          env: 'CONSOLE_LOG_LEVEL'
        }
      },
      syslog: {
        active: {
          doc: 'Log to syslog?',
          format: Boolean,
          default: false,
          env: 'LOG_TO_SYSLOG'
        },
        level: {
          doc: 'Syslog Log Level',
          format: ['trace', 'debug', 'info', 'warn', 'error', 'fatal'],
          default: 'info',
          env: 'SYSLOG_LOG_LEVEL'
        },
        host: {
          doc: 'syslog host to log to',
          default: 'rsyslog',
          env: 'SYSLOG_HOST'
        },
        port: {
          doc: 'udp port of syslog',
          default: 514,
          format: 'port',
          env: 'SYSLOG_PORT'
        },
        facility: {
          doc: 'the syslog facility',
          default: 'user',
          format: ['user', 'daemon', 'local0', 'local1', 'local2', 'local3', 'local4', 'local5', 'local6', 'local7'],
          env: 'SYSLOG_FACILITY'
        }
      }
    },
    mysql: {
      host: {
        doc: 'Mysql host',
        format: String,
        default: 'db-host-default.com',
        env: 'MYSQL_HOST'
      },
      user: {
        doc: 'Mysql user',
        format: String,
        default: 'default-user',
        env: 'MYSQL_USER'
      },
      password: {
        doc: 'Mysql password',
        format: String,
        default: 'default-password',
        env: 'MYSQL_PASSWORD'
      },
      database: {
        doc: 'Mysql database',
        format: String,
        default: 'default-db-name',
        env: 'MYSQL_DATABASE'
      },
      connectionLimit: {
        doc: 'Mysql connection Limit',
        format: Number,
        default: 10,
        env: 'MYSQL_CONNECTION_LIMIT'
      }
    },
    redis: {
      host: {
        doc: 'redis host',
        format: String,
        default: 'localhost',
        env: 'REDIS_HOST'
      },
      port: {
        doc: 'redis port',
        format: Number,
        default: 6379,
        env: 'REDIS_PORT'
      }
    },
    session: {
      cookie: {
        secret: {
          doc: 'cookie secret',
          format: String,
          default: 'uWxQ7UAv({9AkXii7$QqxyK',
        },
        secure: {
          doc: 'cookie secure',
          format: Boolean,
          default: false
        },
        httpOnly: {
          doc: 'cookie httpOnly',
          format: Boolean,
          default: false
        },
        maxAge: {
          doc: 'cookie max age',
          format: Number,
          default: 86400000
        },
        name: {
          doc: 'session cookie name',
          format: String,
          default: 'sp_team_dev.sid',
        }
      }
    },
    publicAPIKey : {
      key : {
        doc : 'key to access certain API routes',
        format : String,
        default : null
      }
    }
  }
  