import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

function EditComponent() {
  const { id } = useParams();
  const [username, setUsername] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleEdit = (e) => {
    e.preventDefault();
    // if (!username.trim() || !phone.trim()) {
    //   setError("Username and phone cannot be empty.");
    //   return;
    // }
    setLoading(true);
    setError("");
    const token = localStorage.getItem("token");
    axios
      .patch(
        `http://localhost:3001/api/admin/userEdit/${id}`,
        { username, phone },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          alert(res.data.message);
          navigate("/getUsers");
        } else {
          setError(res.data.msg || "Could not edit data");
        }
      })
      .catch((err) => {
        setLoading(false);
        setError("Error occurred while editing");
      });
  };
  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      axios
        .get(`http://localhost:3001/api/admin/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setEmail(response.data.email));
    } catch (err) {
      console.log(err);
    }
  }, [id]);
  return (
    <>
      <h1>Edit User</h1>
      <Form
        className="center"
        onSubmit={(e)=>handleEdit(e)}
        style={{ maxWidth: "300px", margin: "auto" }}
      >
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            disabled
            // placeholder="Enter username"
            value={email}
          />
        </Form.Group>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Enter phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Form.Group>
        <br/>{error && <Alert variant="danger">{error}</Alert>}
        <br/>
        <Button variant="primary" type="submit">
          {loading ? "Editing..." : "Edit Changes"}
        </Button>
      </Form>
    </>
  );
}
export default EditComponent;
