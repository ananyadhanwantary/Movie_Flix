import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';

function RegisterComponent() {
  const [user,setUser]=useState({
    email:"",password:"",username:"",phone:""
  })
  async function handleSignup(e){
    e.preventDefault()
    // setUser(()=>{
    //   email:document.getElementById("email")
    //   password:document.getElementById("password")
    //   username:document.getElementById("username")
    //   phone:document.getElementById("phone")
    // })
    try{
      console.log(user)
      await axios.post("http://localhost:3001/api/signup",user)
      alert("You have sign up successfully")
    }
    catch(err){
      console.log(err)
    }
    // useEffect(()=>alert(}){),[user])
  }
 // useEffect(()=>alert("You have signedup successfully"),[user])
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h3 className="text-center">Register</h3>
            </div>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label>Email</label>
                  <input type="text" value={user.email} className="form-control" placeholder="Enter email" id="email" required 
                  onChange={(e)=>{
                    setUser((user)=>{
                      return {
                        ...user,
                        email:e.target.value
                      }
                    })
                  }}/>
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" value={user.password} className="form-control" placeholder="Password" id="password" required 
                  onChange={(e)=>{
                    setUser((user)=>{
                      return {
                        ...user,
                        password:e.target.value
                      }
                    })
                  }}/>
                </div>
                <div className="form-group">
                  <label>Username</label>
                  <input type="text" value={user.username} className="form-control" placeholder="Enter username" id="username" required 
                  onChange={(e)=>{
                    setUser((user)=>{
                      //console.log(user)
                      return {
                        ...user,
                        username:e.target.value
                      }
                    })
                  }}/>
                </div>
                <div className="form-group">
                  <label>Phone number</label>
                  <input type="tel" value={user.phone} className="form-control" placeholder="Enter phone number" id="phone" required 
                  onChange={(e)=>{
                    setUser((user)=>{
                      return {
                        ...user,
                        phone:e.target.value
                      }
                    })
                  }}/>
                </div>
                <button className="btn btn-primary btn-block" onClick={(e)=>handleSignup(e)}>REGISTER</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterComponent;
