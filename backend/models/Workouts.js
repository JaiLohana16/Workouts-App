const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  title: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reps: { type: Number },
  load: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('Workout', workoutSchema);
