import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterComponent() {
  const [user, setUser] = useState({
    email: "", password: "", username: "", phone: ""
  })
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const handleSignup = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    axios.post("http://localhost:3001/api/signup", user)
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          alert(res.data.message)
          navigate('/login');
        } else {
          setError(res.data.msg || 'Signup failed');
        }
      }).catch(err => {
        setLoading(false);
        setError('Error in Signup')
      })
  }
  return (
    <div className="vh-100">
    <br/><br/>
      <div className="container-fluid d-flex align-items-center justify-content-center h-75">
        <div className="card p-4 shadow" style={{ width: '30rem' }}>
            <h3 className="card-title text-center">Register</h3>
            <div className="card-body">
              <form onSubmit={(e) => handleSignup(e)}>
                <div className="form-group form-label">
                  <label>Email</label>
                  <input
                    type="email"
                    value={user.email}
                    className="form-control"
                    // placeholder="Enter email"
                    required
                    onChange={(e) => {
                      setUser((user) => {
                        return {
                          ...user,
                          email: e.target.value
                        }
                      })
                    }} />
                </div>
                <div className="form-group form-label">
                  <label>Password</label>
                  <input
                    type="password"
                    value={user.password}
                    className="form-control"
                    // placeholder="Password"
                    required
                    onChange={(e) => {
                      setUser((user) => {
                        return {
                          ...user,
                          password: e.target.value
                        }
                      })
                    }} />
                </div>
                <div className="form-group form-label">
                  <label>Username</label>
                  <input
                    type="text"
                    value={user.username}
                    className="form-control"
                    // placeholder="Enter username"
                    required
                    onChange={(e) => {
                      setUser((user) => {
                        return {
                          ...user,
                          username: e.target.value
                        }
                      })
                    }} />
                </div>
                <div className="form-group form-label">
                  <label>Phone number</label>
                  <input
                    type="tel"
                    value={user.phone}
                    className="form-control"
                    // placeholder="Enter phone number"
                    required
                    onChange={(e) => {
                      setUser((user) => {
                        return {
                          ...user,
                          phone: e.target.value
                        }
                      })
                    }} />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="d-grid">
                  <button
                    type='submit'
                    className="btn btn-primary btn-block"
                    disabled={loading}
                  >{loading ? 'Signing up...' : 'Sign up'}</button>
                </div>
              </form>
              </div>
            </div>
      </div>
      <br/><br/><br/>
    </div>
  );
}

export default RegisterComponent;
