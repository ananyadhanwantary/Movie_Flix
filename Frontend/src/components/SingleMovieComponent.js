import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { AiFillLike } from "react-icons/ai";
import { useAuth } from "../providers/AuthProvider";
import { useNavigate, useParams } from "react-router-dom";

function SingleMovieComponent() {
  const navigate = useNavigate();
  const params = useParams();
  const { userId } = useAuth();
  const [movie, setMovie] = useState({});
  const [like, setLike] = useState(false);
  const [likecnt,setLikecnt]=useState({});
  const [comment, setComment] = useState("");
  const [getComments, setgetComments] = useState([]);
  // const [likes,setLikes]=useState(0);

  useEffect(() => {
    const { id } = params;
    axios
      .get(`http://localhost:3001/api/movie/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err));
    axios.get(`http://localhost:3001/api/movie/likecnt/${id}`)
    .then((res)=>{
        setLikecnt(res.data);
        console.log(res.data)
    })
    .catch((err)=>console.log(err));
    
  },[params,like]);
useEffect(()=>{
  var temp
    checkLikes(movie._id)
    .then(res =>{ 
      temp=res
      if(temp){
        document.getElementById("like_button").style.color = "red";
      }
    })
    .catch(err => console.log(err))
},)
  async function handleLike(id) {
    const token = localStorage.getItem("token");
    if (token) {
      // var res = await axios.get(
      //   `http://localhost:3001/api/movie/like/${id}`,
      //   {params : {userId: userId }}
      // );
      // if (res.data.status) navigate("/login");
      // else {
      //   setLike(res.data.liked);
      // }
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
      } else {
        try {
          var resd = await axios.delete(
            `http://localhost:3001/api/movie/like/${id}`,
            { userId: userId }
          );
          if (resd.status === 200) {
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
  async function checkLikes(id){
    var res = await axios.get(
      `http://localhost:3001/api/movie/like/${id}`,
      {params : {userId: userId }}
    );
    console.log(res.data.liked)
    if (res.data.liked===true){
      setLike(true);
       return true;
      } 
    if (res.data.liked===false){ 
      setLike(false)
      return false
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
    const token = localStorage.getItem("token");
    axios
      .get(
        `http://localhost:3001/api/movie/comments/${id}`,
        { userId: userId }
      )
      .then((res) => {
        setgetComments(res.data);
      })
      .catch((err) => console.log(err));
  }
  return (
<div>
<div className="d-flex justify-content-center align-items-center mt-5">
      <div className="card mb-3 text-white bg-black bg-opacity-50" style={{ maxWidth: '800px' }}>
        <div className="row g-0">
          <div className="col-md-4 d-flex align-items-center justify-content-center">
            <img
              style={{ height: "300px", width: "auto" }}
              decoding="async"
              className="img-fluid rounded-start border"
              src={movie.moviePosterUrl}
              alt={movie.movieName}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h2 className="card-title poetsen-one-regular">{movie.movieName}</h2>
              <br />
              <br />
              <p className="card-text"><strong>Genre:</strong> {movie.genre}</p>
              <p className="card-text"><strong>Actors:</strong> {movie.movieCast}</p>
              <div className="d-flex align-items-center">
                <AiFillLike
                  onClick={() => handleLike(movie._id)}
                  id="like_button"
                  style={{ cursor: "pointer", fontSize: "24px" }}
                  className={like ? "text-danger me-2" : ""}
                />
                <p>{like}</p>
                <h6 className="pt-2">{likecnt.Likes}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="container mb-5 pb-5" style={{ maxWidth: '600px' }}>
      <Form.Group controlId="comment" className="mb-4">
        <Form.Label className="fw-bold">Comment:</Form.Label>
        <Form.Control
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Enter your comment here"
        />
      </Form.Group>
      <Button
        variant="primary"
        className="me-2"
        onClick={() => addComment(movie._id)}
      >
        Submit Comment
      </Button>
      <Button
        variant="secondary"
        onClick={() => getCom(movie._id)}
      >
        Get Comments
      </Button>
      <div className="mt-5">
        <h3 className="mb-3">Comments</h3>
        {getComments.map((comment) => (
          <div key={comment._id} className="my-3">
            <div className="fw-bold">{comment.commentedUser.username}</div>
            <div>{comment.comment}</div>
          </div>
        ))}
      </div>
    </div>
      </div>
  );
}

export default SingleMovieComponent;

