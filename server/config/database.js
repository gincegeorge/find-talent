const mongoose = require('mongoose');
require('dotenv').config()
const { MONGO_URI } = process.env
const { debug } = require('../utils/debug')

exports.connect = () => {
    mongoose
        .connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => {
            debug('Successfully connected to database')
        })
        .catch((err) => {
            debug('database connection failed. exiting now...')
            console.error(err);
            // process.exit(1);
        })
}