import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike } from 'react-icons/ai';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons"; // Import Font Awesome play icon
import { useAuth } from "../providers/AuthProvider";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/SingleMovieComponent.css"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const posterURL = process.env.REACT_APP_posterURL;


function SingleMovieComponent() {
  const navigate = useNavigate();
  const params = useParams();
  const { userId } = useAuth();
  const [movie, setMovie] = useState({});
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [likecnt, setLikecnt] = useState(0);
  const [dislikecnt, setDislikecnt] = useState(0);
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
        setDislike(res.data.disliked)
      })
      .catch((err) => console.log(err));
  },[]);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/movie/likecnt/${id}`)
      .then((res) => {
        setLikecnt(res.data.Likes);
      })
      .catch((err) => console.log(err));
  },[like])

  useEffect(() => {
    axios.get(`http://localhost:3001/api/movie/dislikecnt/${id}`)
      .then((res) => {
        setDislikecnt(res.data.Dislikes);
      })
      .catch((err) => console.log(err));
  },[dislike])

  async function handleDislike(id){
    const token = localStorage.getItem("token");
    if (token) {
      if (!dislike) {
        try {
          var res = await axios.put(
            `http://localhost:3001/api/movie/dislike/${id}`,
            { userId: userId }
          );
          if (res.status === 200) {
            setDislike(true);
          }
          if(like){
            handleLike(id)
          }
        } catch (err) {
          console.log(err);
        }
      } 
      else {
        try {
          var res = await axios.delete(
            `http://localhost:3001/api/movie/dislike/${id}`,
            { userId: userId }
          );
          if (res.status === 200) {
            setDislike(false);
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
          }
          if(dislike){
            handleDislike(id)
          }
        } 
        catch (err) {
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

  async function handleWatchlist(id) {
   
    const res = axios.post(`http://localhost:3001/api/movie/watchlist/${id}`,{userId:userId})
    .then((res) => {
      toast.success("Movie added to watchlist!", {
        position: "top-center"
      });
    })
    .catch((err) => console.log(err));
  }

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
              <div className="d-flex align-items-center border border-dark-subtle rounded-pill" style={{width: "fit-content"}}>
                <AiOutlineLike
                  onClick={() => handleLike(movie._id)}
                  id="like_button"
                  style={{ cursor: "pointer", fontSize: "30px" }}
                  className={like ? "text-danger mx-3 my-1" : "text-white mx-3 my-1"}
                />
                <span className="like">{likecnt}</span>
                <div className="vr border mx-2"></div>
                <span className="like">{dislikecnt}</span>
                <AiOutlineDislike
                  onClick={() => handleDislike(movie._id)}
                  id="dislike_button"
                  style={{ cursor: "pointer", fontSize: "30px", transform: "rotateY(180deg)" }}
                  className={dislike ? "text-danger mx-3 my-1" : "text-white mx-3 my-1"}
                />
              </div>

              {/* Watchlist Button */}
              <Button variant="primary" className="mt-3" onClick={() => handleWatchlist(movie._id)}>
                Add to Watchlist
              </Button>
              <ToastContainer />

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
