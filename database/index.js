'use strict';

const config = require('../config/mongo.js');
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

let connection = mongoose.connect(`mongodb://${config.login}:${config.password}@ds033976.mlab.com:33976/rarus_db_title`);
autoIncrement.initialize(connection);

module.exports.contact = function() {
  // Use native promises
  mongoose.Promise = global.Promise;

  let ContactSchema = mongoose.Schema({
    Name: String,
    LastName: String,
    Age: Number,
    Phone: Number,
    date: {
      type: Date,
      default: Date.now
    }
  });
  ContactSchema.plugin(autoIncrement.plugin, { model: 'Contact', field: 'id' });

  return mongoose.model('Contact', ContactSchema);
};
