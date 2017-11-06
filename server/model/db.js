const mongoose = require('mongoose')
const config = require('../../core.config')

mongoose.Promise = global.Promise
mongoose.connect(`${config.db.host}${config.db.dbname}`, { useMongoClient: true })

module.exports = mongoose;