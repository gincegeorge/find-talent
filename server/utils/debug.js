const debug = require('debug')('debug')
const dbDebug = require('debug')('db')
const adminDebug = require('debug')('admin')
const userDebug = require('debug')('user')

module.exports = {
    debug,
    dbDebug,
    adminDebug,
    userDebug
}

//XXX $env:DEBUG = "debug","admin","db","user"