import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const WorkoutList = () => {
  const { token } = useContext(AuthContext);
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/workouts', {
          headers: { Authorization: `Bearer ${token}` },
        });
          setWorkouts(response.data);
      } catch (err) {
        if (err.response?.status === 401) {
          setError('Unauthorized access. Please log in again.');
        } else {
          setError('Failed to load workouts');
        }
      }
    };

    if (token) {
      fetchWorkouts();
    } else {
      setError('Unauthorized access. Please log in.');
    }
  }, [token,workouts]);

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h2>Your Workouts</h2>
      <ul>
        {workouts.length > 0 ? (
          workouts.map(workout => (
            <li key={workout._id}>
              <p>{workout.title}</p>
              {/* Add delete or other options here */}
            </li>
          ))
        ) : (
          <div>No workouts to show. Please add a workout.</div>
        )}
      </ul>
    </div>
  );
};

export default WorkoutList;
