const debug = require('debug')('debug')
const dbDebug = require('debug')('db')
const adminDebug = require('debug')('admin')
const log = require('debug')('log')

module.exports = {
    debug,
    dbDebug,
    adminDebug,
    log
}

//XXX $env:DEBUG = "debug","admin","db","log"