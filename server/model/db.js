const mongoose = require('mongoose');
const config = require('../../core.config');

mongoose.connect(`${config.db.host}${config.db.dbname}`, { useMongoClient: true });

module.exports = mongoose;