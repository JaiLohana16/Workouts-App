const Workout = require('../models/Workouts');

exports.getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user._id });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  try {
    const workout = await Workout.create({ title, reps, load, user: req.user._id });
    res.status(201).json(workout);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateWorkout = async (req, res) => {
  const { id } = req.params;

  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteWorkout = async (req, res) => {
  const { id } = req.params;

  try {
    const workout = await Workout.findOneAndDelete({ _id: id, user: req.user._id });
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.status(200).json({ message: 'Workout deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
