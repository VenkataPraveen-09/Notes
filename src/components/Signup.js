import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
 import './Signup.css';
const Signup = (props) => {
  const[credentials,setCredentials]= useState({name:"",email:"",password:"",cpassword:""})
  let navig=useNavigate();
  const handleSubmit=async (e)=>{
    e.preventDefault();
    const {name,email,password}=credentials;
    const response = await fetch("http://localhost:3001/api/auth/createUser",{
        method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({name,email,password})
          });

          const json = await response.json()
          console.log(json);
          if(json){
            //redirect
            localStorage.setItem('token',json.authtoken);
            navig("/login");
            props.showAlert("Account Created Successfully","success");
          }
          else{
            props.showAlert("Invalid Details","danger")
          }
}
const onChange=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
}
useEffect(() => {
  // Add the pleasant-background class to the body element when the component mounts
  document.body.classList.add('pleasant-background');

  // Remove the pleasant-background class when the component unmounts
  return () => {
      document.body.classList.remove('pleasant-background');
  };
}, []);
return (
  <div className="signup-container">
    <h3>Create an account to use Inotebook</h3>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          onChange={onChange}
          aria-describedby="emailHelp"
          value={credentials.name}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          onChange={onChange}
          aria-describedby="emailHelp"
          value={credentials.email}
        />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          onChange={onChange}
          minLength={5}
          required
          value={credentials.password}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="cpassword" className="form-label">
          Confirm Password
        </label>
        <input
          type="password"
          className="form-control"
          id="cpassword"
          name="cpassword"
          onChange={onChange}
          minLength={5}
          required
          value={credentials.cpassword}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  </div>
);
};

export default Signup;