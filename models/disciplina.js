const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
  day: { type: String, required: true }, // e.g., "Monday"
  startTime: { type: String, required: true }, // e.g., "09:00"
  endTime: { type: String, required: true } // e.g., "10:00"
});

const disciplineSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  schedule: [scheduleSchema]
});

module.exports = mongoose.model('Discipline', disciplineSchema);
