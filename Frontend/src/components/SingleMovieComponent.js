import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike } from 'react-icons/ai';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons"; // Import Font Awesome play icon
import { useAuth } from "../providers/AuthProvider";
import { useNavigate, useParams } from "react-router-dom";
const posterURL = process.env.REACT_APP_posterURL;

function SingleMovieComponent() {
  const navigate = useNavigate();
  const params = useParams();
  const { userId } = useAuth();
  const [movie, setMovie] = useState({});
  const [like, setLike] = useState(false);
  const [likecnt, setLikecnt] = useState({});
  const [comment, setComment] = useState("");
  const [isPlaying, setIsPlaying] = useState(false); 
  const { id } = params;
  useEffect(() => {
    
    axios
      .get(`http://localhost:3001/api/movie/${id}`,)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err));

    axios.get(`http://localhost:3001/api/movie/like/${id}`,{params: { userId: userId }})
      .then((res) =>{
        setLike(res.data.liked)
        console.log(res.data)
      })
      .catch((err) => console.log(err));
  },[]);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/movie/likecnt/${id}`)
      .then((res) => {
        setLikecnt(res.data);
      })
      .catch((err) => console.log(err));
  },[like])

  async function handleLike(id) {
    const token = localStorage.getItem("token");
    if (token) {
      if (!like) {
        try {
          var res = await axios.put(
            `http://localhost:3001/api/movie/like/${id}`,
            { userId: userId }
          );
          if (res.status === 200) {
            setLike(true);
            document.getElementById("like_button").style.color = "red";
          }
        } catch (err) {
          console.log(err);
        }
      } 
      else {
        try {
          var res = await axios.delete(
            `http://localhost:3001/api/movie/like/${id}`,
            { userId: userId }
          );
          if (res.status === 200) {
            setLike(false);
            document.getElementById("like_button").style.color = "white";
          }
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      alert("User not Logged In Please Login");
      navigate("/login");
    }
  }

  function addComment(id) {
    const token = localStorage.getItem("token");
    axios
      .put(
        `http://localhost:3001/api/movie/comment/${id}`,
        { comment: comment, userId: userId }
      )
      .then((res) => {
        if (res.data.status) navigate("/login");
        else {
          setMovie(res.data);
          setComment("");
        }
      })
      .catch((err) => console.log(err));
  }

  function getCom(id) {
    axios
      .get(
        `http://localhost:3001/api/movie/comments/${id}`,
        { userId: userId }
      )
      .then((res) => {
        // setgetComments(res.data);
      })
      .catch((err) => console.log(err));
  }


  // Function to handle video play
  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <div className="card text-white bg-black bg-transparent">
            <div className="card-body">
              {/* Video Player with Thumbnail */}
              <div className="position-relative">
                {!isPlaying && (
                  <>
                    <img
                      src={`${posterURL}${movie.moviePosterName}`}
                      alt={movie.movieName}
                      className="img-fluid rounded mb-3"
                      style={{ width: "100%" }}
                    />
                    <button 
                      className="play-button" 
                      onClick={handlePlayClick}
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        border: "none", // Remove border
                        cursor: "pointer",
                        width: "80px", // Width of the button
                        height: "80px", // Height of the button
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "none", // Remove background
                        borderRadius: "50%", // Keep circular shape
                        outline: "none", // Remove outline on focus
                      }}
                    >
                      <FontAwesomeIcon icon={faPlay} size="3x" color="white" /> {/* Play icon with white color */}
                    </button>

                  </>
                )}
                {isPlaying && (
                  <video className="movie-player w-100 mb-3" controls autoPlay>
                    <source src={`${process.env.REACT_APP_movieURL}${movie.movieFileName}`} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>

              {/* Movie Title and Details */}
              <h2>{movie.movieName} ({movie.releaseYear})</h2>
              <p><strong>Genre:</strong> {movie.genre}</p>
              <p><strong>Language:</strong> {movie.language}</p>
              <p><strong>Cast:</strong> {movie.movieCast}</p>
              <p><strong>Description:</strong> {movie.description}</p>

              {/* Like Button */}
              <div className="d-flex align-items-center">
                <AiOutlineLike
                  onClick={() => handleLike(movie._id)}
                  id="like_button"
                  style={{ cursor: "pointer", fontSize: "30px" }}
                  className={like ? "text-danger" : "text-white"}
                />
                <p>{likecnt.Likes}</p>
                <hr />
                <AiOutlineDislike
                  onClick={() => handleLike(movie._id)}
                  id="like_button"
                  style={{ cursor: "pointer", fontSize: "30px", transform: "rotateY(180deg)" }}
                  className={like ? "text-danger" : "text-white"}
                />
              </div>

              {/* <div class="like-dislike-container">
                <div className="like-button" onclick={handleLike()}>
                    <i className="fas fa-thumbs-up"></i>
                    <span className="button-count">100</span>
                </div>
                <div className="dislike-button" onclick="toggleDislike()">
                    <i className="fas fa-thumbs-down"></i>
                    <span className="button-count">10</span>
                </div>
              </div> */}

              {/* Watchlist Button */}
              <Button variant="primary" className="mt-3" onClick={() => alert("Added to Watchlist!")}>
                Add to Watchlist
              </Button>

              {/* Comment Section */}
              <Form.Group controlId="comment" className="mt-4">
                <Form.Label className="fw-bold">Comment:</Form.Label>
                <Form.Control
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Enter your comment here"
                />
              </Form.Group>
              {/* <Button variant="primary" className="me-2" onClick={() => addComment(movie._id)}>
                Submit Comment
              </Button>
              <Button variant="secondary" onClick={() => getCom(movie._id)}>
                Get Comments
              </Button> */}

              {/* Display Comments */}
              {/* <div className="mt-5">
                <h3 className="mb-3">Comments</h3>
                {getComments.map((comment) => (
                  <div key={comment._id} className="my-3">
                    <div className="fw-bold">{comment.commentedUser.username}</div>
                    <div>{comment.comment}</div>
                  </div>
                ))}
              </div> */}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default SingleMovieComponent;
