const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true, 
  },
  teach: {
    type: String,
    required: true,
    lowercase: true,
  },
  designation: {
    type: String,
    required: true,
    lowercase: true,
  },
  pass: {
    type: String,
    required: true,
    lowercase: true,
  },
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
