import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useAuth } from "../providers/AuthProvider";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { userId } = useAuth();
  const navigate=useNavigate();

  const handleTogglePasswordVisibility = (type) => {
    if (type === "current") setShowCurrentPassword(!showCurrentPassword);
    if (type === "new") setShowNewPassword(!showNewPassword);
    if (type === "confirm") setShowConfirmNewPassword(!showConfirmNewPassword);
  };


  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError("New password and confirm password must match.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      axios
        .post("http://localhost:3001/api/changePassword", {
          userId: userId,
          currentPassword,
          newPassword,
        })
        .then((res) => {
          console.log(res);
          setLoading(false);
          if (res.status === 200) {
            // alert(res.data.message);
            toast.success(res.data.message, { position: "top-center" });
          } else {
            console.log(res.data.msg);
            setError(res.data.msg || "ChangePassword failed");
          }
          setLoading(false);
          setSuccessMessage("Password changed successfully.");
          setCurrentPassword("");
          setNewPassword("");
          setConfirmNewPassword("");
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
          setError(error.message || "Password change failed.");
        });
        navigate('/profile');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="vh-100">
      <br />
      <br />
      <div className="container-fluid d-flex align-items-center justify-content-center h-75">
        <div className="card p-4 shadow" style={{ width: "20rem" }}>
          <h3 className="card-title text-center">Change Password</h3>
          <form onSubmit={handleChangePassword}>
            {error && <div className="alert alert-danger">{error}</div>}
            {successMessage && (
              <div className="alert alert-success">{successMessage}</div>
            )}
            <div className="mb-3">
              <label htmlFor="currentpassword" className="form-label">
                Current Password
              </label>
              <div className="input-group">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  className="form-control"
                  id="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
                <div className="input-group-append">
                  <div
                    className="btn btn-outline-secondary"
                    onClick={() => handleTogglePasswordVisibility("current")}
                  >
                    {showCurrentPassword ? <RiEyeOffFill /> : <RiEyeFill />}
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="newpassword" className="form-label">
                New Password
              </label>
              <div className="input-group">
                <input
                  type={showNewPassword ? "text" : "password"}
                  className="form-control"
                  id="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <div className="input-group-append">
                  <div
                    className="btn btn-outline-secondary"
                    onClick={() => handleTogglePasswordVisibility("new")}
                  >
                    {showNewPassword ? <RiEyeOffFill /> : <RiEyeFill />}
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="confirmNewpassword" className="form-label">
                Confirm New Password
              </label>
              <div className="input-group">
                <input
                  type={showConfirmNewPassword ? "text" : "password"}
                  className="form-control"
                  id="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                />
                <div className="input-group-append">
                  <div
                    className="btn btn-outline-secondary"
                    onClick={() => handleTogglePasswordVisibility("confirm")}
                  >
                    {showConfirmNewPassword ? <RiEyeOffFill /> : <RiEyeFill />}
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
                {loading ? "Changing Password..." : "Change Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
