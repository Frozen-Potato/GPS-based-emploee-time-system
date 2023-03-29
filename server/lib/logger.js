const bunyan = require('bunyan')
const config = require('../config')

const streams = []
const serviceName = `${config.stage}-${config.service_name}`

if (config.log.syslog.active) {
    streams.push({
        type: 'raw',
        level: config.log.syslog.level,
        stream: require('bunyan-syslog-udp').createBunyanStream({
            name: serviceName,
            level: config.log.syslog.level,
            host: config.log.syslog.host,
            port: config.log.syslog.port,
            facility: config.log.syslog.facility
        })
    })
}

if (config.log.console.active) {
    streams.push({
        name: serviceName,
        stream: process.stdout,
        level: config.log.console.level
    })
}

module.exports = bunyan.createLogger({ name: serviceName, streams, serializers: bunyan.stdSerializers })
