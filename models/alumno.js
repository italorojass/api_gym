const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  disciplines: [{ type: Schema.Types.ObjectId, ref: 'Disciplina' }]
});

module.exports = mongoose.model('Alumno', studentSchema);
