import { Card, Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import { IoPersonSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import CardForWatchlist from "./CardForWatchlist";
const API_URL = process.env.REACT_APP_API_URL

function ProfileComponent() {
  var navigate = useNavigate();
  const { userId } = useAuth();
  const [user, setUser] = useState({});
  const [likedMovies, setLikedMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  useEffect(() => {
    async function getData() {
      await axios
        .get(`${API_URL}api/user/${userId}`)
        .then((res) => {
          setUser(res.data);
          setWatchlist(res.data.watchlist);
        })
        .catch((err) => console.log(err));

      await axios
        .get(`${API_URL}api/movie/liked`, {
          params: { userId: userId },
        })
        .then((res) => setLikedMovies(res.data))
        .catch((err) => console.log(err));
    }
    getData();
  }, [userId]);

  function removeFromwatchlist(movieId) {
    console.log(userId);
    axios
      .delete(`${API_URL}api/movie/watchlist/${movieId}`, {
        params: { userId: userId },
      })
      .then((res) => {
        console.log("removed");
        setWatchlist(watchlist.filter((id) => id !== movieId));
      })
      .catch((err) => console.log(err));
  }

  function editUserDetails(e) {
    e.preventDefault();
    navigate(`/editUser/${userId}`)
  }

  function handleChangePassword(e) {
    e.preventDefault();
    navigate("/changePassword");
  }
  return (
    <>
      <Container className="d-flex flex-column align-items-center justify-content-center my-5">
        <IoPersonSharp size={200} className="mb-3" />
        <Card className="mx-4" style={{ maxWidth: "500px" }}>
          <Card.Body>
            <Card.Title style={{textAlign: "center"}}>{user.username}</Card.Title>
            <Card.Text>
              <strong>Email:</strong> {user.email}
              <br />
              <strong>Phone Number:</strong> {user.phone}
            </Card.Text>
          </Card.Body>
        </Card>
        <div className="d-flex justify-content-around mt-2">
          <button className="btn btn-outline-light me-2" onClick={(e) => { editUserDetails(e) }}>
            Edit
          </button>
          <button className="btn btn-outline-light me-2" onClick={(e) => { handleChangePassword(e) }}>
            Change Password
          </button>
        </div>
      </Container>

      {watchlist && watchlist.length > 0 ? (
        <>
          <h1 style={{ width: "fit-content" }} className="bold  ms-5 mb-3">
            My Watchlist
          </h1>
          <Container className="">
            <Row className="justify-content-start">
              {watchlist.map((movieId) => (
                <Col
                  key={movieId}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  className="custom-col-lg custom-col mb-4"
                >
                  <CardForWatchlist
                    movieId={movieId}
                    eventHandler={removeFromwatchlist}
                  />
                </Col>
              ))}
            </Row>
          </Container>
        </>
      ) : (
        <></>
      )}

      {likedMovies && likedMovies.length > 0 ? (
        <>
          <h1 style={{ width: "fit-content" }} className="bold  ms-5 mb-3">
            My Likedlist
          </h1>
          <Container className="">
            <Row className="justify-content-start">
              {likedMovies.map((movie) => (
                <Col
                  key={movie._id}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  className="custom-col-lg custom-col mb-4"
                >
                  <CardForWatchlist movie={movie} />
                </Col>
              ))}
            </Row>
          </Container>
        </>
      ) : (
        <div className="min-vh-100"></div>
      )}
    </>
  );
}

export default ProfileComponent;
