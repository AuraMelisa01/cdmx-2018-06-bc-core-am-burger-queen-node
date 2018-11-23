'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BreakfastSchema = Schema({
  text: String,
  create_at: String, //fecha
  user: {type: Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Breakfast', BreakfastSchema);
