import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, errorMessage,setErrorMessage } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const res=await signup({ email, password });
    if (errorMessage) {
      navigate("/signup")
      setErrorMessage("")
    }else{
      navigate('/');  
}};
  
  return (
    <div>
    <form style={{ position: "relative", top: "100px", display: "flex", gap: "5px", flexDirection: "column", justifyContent: "center", alignItems: "center", border: "2px solid black", width: "500px", margin: "auto", height: "550px", borderRadius: "30px" }}
      onSubmit={handleSignup}>
      <h1 style={{ margin: "30px", fontSize: "50px" }}>SIGN UP</h1>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "50px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "50px", width: "350px" }}>
          <label  style={{ fontSize: "30px" }}>Name:</label>
          <input type="text" name="name"  style={{ padding: "5px", borderRadius: "20px", width: "250px" }} required/>
        </div>
        
        <div style={{ display: "flex", alignItems: "center", gap: "50px", width: "350px" }}>
          <label htmlFor="email" style={{ fontSize: "30px" }}>Email:</label>
          <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: "5px", borderRadius: "20px", width: "250px" }} />
        </div>
        
        <div style={{ display: "flex", alignItems: "center", gap: "10px", width: "350px" }}>
          <label htmlFor="password" style={{ fontSize: "30px" }}>Password:</label>
          <input type="password" name="password"value={password} onChange={(e) => setPassword(e.target.value)} style={{ padding: "5px", borderRadius: "20px", width: "250px" }} />
        </div>
      </div>
      
      <button type="submit" style={{ fontSize: "30px", padding: "2px", cursor: "pointer", backgroundColor: "green", width: "150px", marginTop: "50px", borderRadius: "50px", border:"none"}}>SIGN UP</button>
      <div style={{fontSize:"30px",marginTop:"20px"}}>Already a User?
      <Link to={"/login"} style={{ fontSize: "30px", padding: "2px", cursor: "pointer", width: "150px", marginTop: "10px",textDecoration:"none"}}>Login</Link>
      </div>
      {errorMessage && <p style={{color:"red", fontSize:"20px",marginBottom:"50px",marginTop:"10px"}}>{errorMessage}</p>}
      </form>
      

    </div>
  );
};

export default SignupPage;
