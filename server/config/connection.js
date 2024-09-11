const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/'); //database not yet created, no name

module.exports = mongoose.connection;