const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  name: String,
  roll: String,
  total: { type: Number, default: 0 },
  present: { type: Number, default: 0 },
});
const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;