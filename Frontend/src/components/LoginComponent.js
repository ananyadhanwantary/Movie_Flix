import React, { useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { loginAction } = useAuth();

  const clearForm = () => {
    setEmail("");
    setPassword("");
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    var status = await loginAction({ email, password });
    console.log(status)
    if(status == 200){
      toast.success("Login successful", { position: "top-center" });
    }
    else if(status == 404){
      toast.error("User does not exist! Signup", { position: "top-center" });
      clearForm()
    }
    else{
      toast.error("Login Failed! Invalid Credentials", { position: "top-center" });
      setPassword("");
    }
    setLoading(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="vh-100">
      <br />
      <br />
      <div className="container-fluid d-flex align-items-center justify-content-center h-75">
        <div className="card p-4 shadow" style={{ width: "20rem" }}>
          <h3 className="card-title text-center">Login</h3>
          <form onSubmit={(e) => handleLogin(e)}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
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
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="input-group-append">
                  <div
                    className="btn btn-outline-secondary"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
                  </div>
                </div>
              </div>
            </div>
            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <br />
    </div>
  );
};

export default Login;
