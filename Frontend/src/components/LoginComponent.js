import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

function LoginComponent() {
  const handleLogin=()=>{
    
  }
  return (
    <>
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
    </>
  );
}

export default LoginComponent;
