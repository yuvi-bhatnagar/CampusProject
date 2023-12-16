const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  roll: String,
  branch: String,
  year: String,
  section: String,
  pass: String,
});
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;