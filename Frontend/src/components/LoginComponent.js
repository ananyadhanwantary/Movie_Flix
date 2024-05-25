import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    // console.log(useAuth())
    const {loginAction} = useAuth()
    // const navigate = useNavigate();
    const handleLogin=(e) => {
        e.preventDefault();
        loginAction({email,password})
    }
    // const handleLogin = (e) => {
    //     e.preventDefault();
    //     setLoading(true);
    //     setError('');
    //     axios.post('http://localhost:3001/api/login', {
    //         email: email,
    //         password: password
    //     }).then((res) => {
    //         setLoading(false);
    //         if (res.status === 200) {
    //             alert(res.data.message)
    //             localStorage.setItem('token', res.data.token);
    //             navigate('/');
    //         } else {
    //             alert(res.data.message)
    //             setError(res.data.msg || 'Login failed');
    //         }
    //     }).catch(err => {
    //         setLoading(false);
    //         alert("User does not exist please Register")
    //         navigate("/signup")
    //         setError('Error in login');
    //     });
    // };

    return (
        <div className="vh-100">
            <div className="container-fluid d-flex align-items-center justify-content-center h-75">
                <div className="card p-4 shadow" style={{ width: '20rem' }}>
                    <h3 className="card-title text-center">Login</h3>
                    <form onSubmit={(e)=>handleLogin(e)}>
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
                        {/* {error && <div className="alert alert-danger">{error}</div>} */}
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary" 
                            disabled={loading}
                            >
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