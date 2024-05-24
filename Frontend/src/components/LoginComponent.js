import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useState,useEffect } from 'react';

function LoginComponent() {
  const {loginDetails,setLoginDetails}=useState(" ")
  useEffect(()=>{
    fetch("http://localhost:3001/api/login")
    .then((response)=>{response.json()})
    .then((data)=>setLoginDetails(data))
  },[])
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-center">Login</h3>
            </div>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" className="form-control" id="email" placeholder="Enter email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" className="form-control" id="password" placeholder="Password" required />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
