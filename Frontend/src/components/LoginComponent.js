// import 'bootstrap/dist/css/bootstrap.min.css';
// import React from 'react';

// function LoginComponent() {
//   return (
//     <>
//       <form>
//         <div className="form-group">
//           <label htmlFor="email">Email</label>
//           <input type="email" className="form-control" id="email" placeholder="Enter email" required />
//         </div>
//         <div className="form-group">
//           <label htmlFor="password">Password</label>
//           <input type="password" className="form-control" id="password" placeholder="Password" required />
//         </div>
//         <button type="submit" className="btn btn-primary btn-block">Login</button>
//       </form>
//     </>
//   );
// }

// export default LoginComponent;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        // console.log(email,password)
        axios.post('http://localhost:3001/api/login', {
            email: email,
            password: password
        }).then((res) => {
            setLoading(false);
            console.log('Response:', res.data);
            
            if (res.status === 200) {
                localStorage.setItem('token', res.data.token);
                navigate('/');
            } else {
                setError(res.data.msg || 'Login failed');
            }
        }).catch(err => {
            setLoading(false);
            navigate("/signup")
            setError('Error in login');
            // console.log(err);
        });
    };

    return (
      <div className="vh-100">
        <div className="container-fluid d-flex align-items-center justify-content-center h-75">
            <div className="card p-4 shadow" style={{ width: '20rem' }}>
                <h3 className="card-title text-center">Login</h3>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </div>
    );
};

export default Login;