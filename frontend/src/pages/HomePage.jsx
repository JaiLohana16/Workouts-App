import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const { token, logout } = useContext(AuthContext);
  const [workouts, setWorkouts] = useState([]);
  const [title, setTitle] = useState('');
  const [reps, setReps] = useState('');
  const [load, setLoad] = useState('');
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  
  const fetchWorkouts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/workouts', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWorkouts(response.data);
    } catch (err) {
      setError('Failed to fetch workouts');
    }
  };
  useEffect(() => {
    fetchWorkouts();
  }, [token]);

  const createWorkout = async (e) => {
    e.preventDefault();
    setError('');
    if(!title||!reps||!load) {
      setError("All Fields are Mandatory") 
      return}
    try {
      
      if (isEditing) {
        await axios.patch(`http://localhost:3000/api/workouts/${editId}`, { title, reps, load }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsEditing(false);
        setEditId(null);
      } else {
        await axios.post('http://localhost:3000/api/workouts', { title, reps, load }, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setTitle('');
      setReps('');
      setLoad('');
      fetchWorkouts() 
    } catch (err) {
      setError('Failed to create or update workout');
    }
  };

  const deleteWorkout = async (id,indexofitemclicked) => {
    try {
      await axios.delete(`http://localhost:3000/api/workouts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedWorkouts=workouts.filter((item,index)=>index!=indexofitemclicked) 
      setWorkouts(updatedWorkouts)
    } catch (err) {
      setError('Failed to delete workout');
    }
  };

  const editWorkout = (workout) => {
    setTitle(workout.title);
    setReps(workout.reps);
    setLoad(workout.load);
    setIsEditing(true);
    setEditId(workout._id);
  };

  return (
    <div>
      
      <div style={{marginLeft:"20px",display: "flex",flexDirection: "column",position: "relative"}}>
      
      <button style={{position: "relative",left: "1400px",width: "100px",top: "30px",padding: "2px",cursor: "pointer",fontSize: "20px",backgroundColor: "red",color: "white",borderRadius:"30px"}} onClick={()=>{logout()}}>Logout</button>
        
        <h1>Workout Tracker</h1>
        
        <form onSubmit={createWorkout} style={{marginTop:"20px",display: "flex",flexDirection: "column",gap: "20px"}}>
          
          <input type="text" placeholder="Workout Title" value={title} onChange={(e) => setTitle(e.target.value)} style={{borderRadius:"20px",padding:"5px",border:"2px solid black",width:"350px"}}/>
          
          <input type="number" placeholder="Reps" value={reps} onChange={(e) => setReps(e.target.value)}  style={{borderRadius:"20px",padding:"5px",border:"2px solid black",width:"350px"}} />
          
          <input type="number" placeholder="Load (kg)" value={load} onChange={(e) => setLoad(e.target.value)} style={{borderRadius:"20px",padding:"5px",border:"2px solid black",width:"350px"}} />
          
          <button type="submit" style={{width: "150px",padding: "2px",fontSize: "15px",cursor: "pointer",backgroundColor: "green",color: "white",borderRadius:"30px"}}>{isEditing ? 'Update Workout' : 'Add Workout'}</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        <ul style={{marginTop:"20px"}}>
          {workouts.map((workout,index) => (
            <li key={workout._id} style={{display: 'flex',flexDirection:"column",justifyContent: 'space-between',gap:"2px",width: '400px',padding: '15px',marginBottom: '10px',border: '1px solid black',borderRadius: '20px',fontSize:"20px",fontWeight:"bold"}}>
              
              <div>Title:{workout.title}</div>
              
              <div>Reps:{workout.reps}</div>  
              
              <div>Load:{workout.load} kg</div>
              
              <div>
              <button style={{backgroundColor: '#000ff0',color: 'white',cursor: 'pointer',padding: '5px',marginRight: '10px',width:"100px",borderRadius:"30px"}} onClick={() => editWorkout(workout)}>Edit</button>
              
              <button style={{backgroundColor: 'red',color: 'white',cursor: 'pointer',padding: '5px',width:"100px",borderRadius:"30px"}} onClick={() => deleteWorkout(workout._id,index)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
