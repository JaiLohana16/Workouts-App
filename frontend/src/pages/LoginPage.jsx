import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, errorMessage,setErrorMessage } = useContext(AuthContext);
  const navigate = useNavigate();
  setErrorMessage("")
  
  const handleLogin = async (e) => {
    e.preventDefault();
    await login({ email, password });
    navigate('/');  
  };

  return (    <div>
  <form style={{ position: "relative", top: "100px", display: "flex", gap: "5px", flexDirection: "column", justifyContent: "center", alignItems: "center", border: "2px solid black", width: "500px", margin: "auto", height: "450px", borderRadius: "30px" }}
      onSubmit={handleLogin}>
      <h1 style={{ margin: "30px", fontSize: "50px" }}>Login</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "50px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "50px", width: "350px" }}>
          <label htmlFor="email" style={{ fontSize: "30px" }}>Email:</label>
          <input type="text"  name="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: "5px", borderRadius: "20px", width: "250px" }}/>
        </div>
        
        <div style={{ display: "flex", alignItems: "center", gap: "10px", width: "350px" }}>
          <label htmlFor="password" style={{ fontSize: "30px" }}>Password:</label>
          <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ padding: "5px", borderRadius: "20px", width: "250px" }}/>
        </div>
      </div>
      
      <button type="submit" style={{ fontSize: "30px", padding: "2px", cursor: "pointer", backgroundColor: "green", width: "150px", marginTop: "50px", borderRadius: "50px",border:"none" }}>Login</button>
      <div style={{margin:"10px"}}><span style={{fontSize:"30px", margin:"5px"}}>Register new user:</span><Link to={"/signup"} style={{ fontSize: "30px", padding: "2px", cursor: "pointer",  width: "150px", marginTop: "50px", borderRadius: "50px",textDecoration:"none"}}>signup</Link>
      </div>
      {errorMessage && <p style={{color:"red", fontSize:"20px",marginBottom:"50px",marginTop:"10px"}}>{errorMessage}</p>}
      </form>
      
      </div>
)};

export default LoginPage;
