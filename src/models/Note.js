const { Mongoose } = require("mongoose")

const mongoose = require('mongoose');
const {Schema} = mongoose;

const NoteSchema = new Schema({
    title:{type: String, require: true},
    description: {type: String, require: true},
    date:{type:date, default: date.now}

});

module.exports = mongoose.model('Note',NoteSchema);