import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

function RegisterComponent() {
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
                  <input type="email" className="form-control" placeholder="Enter email" required />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" className="form-control" placeholder="Password" required />
                </div>
                <div className="form-group">
                  <label>Username</label>
                  <input type="text" className="form-control" placeholder="Enter username" required />
                </div>
                <div className="form-group">
                  <label>Phone number</label>
                  <input type="tel" className="form-control" placeholder="Enter phone number" required />
                </div>
                <button type="submit" className="btn btn-primary btn-block">REGISTER</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterComponent;
