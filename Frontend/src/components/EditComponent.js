import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const API_URL = process.env.REACT_APP_API_URL

function EditComponent() {
  const { id } = useParams();
  const [username, setUsername] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      axios
        .get(`${API_URL}api/user/${id}`)
        .then((response) => setEmail(response.data.email));
    } catch (err) {
      console.log(err);
    }
  }, [id]);

  const handleEdit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    axios
      .put(`${API_URL}api/user/userEdit/${id}`, {
        username,
        phone,
      })
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          alert(res.data.message);
          navigate("/profile");
        } else {
          setError(res.data.msg || "Could not edit data");
        }
      })
      .catch((err) => {
        setLoading(false);
        setError("Error occurred while editing");
      });
  };

  return (
    <div className="vh-100">
      <br />
      <br />
      <div className="container-fluid d-flex align-items-center justify-content-center h-75">
        <div className="card p-4 shadow" style={{ width: "30rem" }}>
          <h3 className="card-title text-center">Edit Details</h3>
          <div className="card-body">
            <form onSubmit={(e) => handleEdit(e)}>
              <div className="form-group form-label">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  className="form-control"
                  disabled
                />
              </div>
              <div className="form-group form-label">
                <label>Username</label>
                <input
                  type="text"
                  value={username}
                  className="form-control"
                  required
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>
              <div className="form-group form-label">
                <label>Phone number</label>
                <input
                  type="tel"
                  value={phone}
                  className="form-control"
                  required
                  onChange={(e) => {
                    setPhone(e.target.value)
                  }}
                />
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  disabled={loading}
                >
                  {loading ? "Updating" : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}
export default EditComponent;
