const express = require('express');
const { getWorkouts, createWorkout, updateWorkout, deleteWorkout } = require('../controllers/workoutController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', protect, getWorkouts);
router.post('/', protect, createWorkout);
router.patch('/:id', protect, updateWorkout);
router.delete('/:id', protect, deleteWorkout);

module.exports = router;
