// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Button, Col, Container, Form, Row } from "react-bootstrap";
// import { AiFillLike } from "react-icons/ai";
// import { useAuth } from "../providers/AuthProvider";
// import { useNavigate, useParams } from "react-router-dom";
// const posterURL = process.env.REACT_APP_posterURL


// function SingleMovieComponent() {
//   const navigate = useNavigate();
//   const params = useParams();
//   const { userId } = useAuth();
//   const [movie, setMovie] = useState({});
//   const [like, setLike] = useState(false);
//   const [likecnt,setLikecnt]=useState({});
//   const [comment, setComment] = useState("");
//   const [getComments, setgetComments] = useState([]);
//   // const [likes,setLikes]=useState(0);

//   useEffect(() => {
//     const { id } = params;
//     console.log(id)
//     axios
//       .get(`http://localhost:3001/api/movie/${id}`)
//       .then((res) => setMovie(res.data))
//       .catch((err) => console.log(err));
//     axios.get(`http://localhost:3001/api/movie/likecnt/${id}`)
//     .then((res)=>{
//         setLikecnt(res.data);
//         console.log(res.data)
//     })
//     .catch((err)=>console.log(err));
    
//   },[params,like]);
// useEffect(()=>{
//   var temp
//     checkLikes(movie._id)
//     .then(res =>{ 
//       temp=res
//       if(temp){
//         document.getElementById("like_button").style.color = "red";
//       }
//     })
//     .catch(err => console.log(err))
// },)
//   async function handleLike(id) {
//     const token = localStorage.getItem("token");
//     if (token) {
//       // var res = await axios.get(
//       //   `http://localhost:3001/api/movie/like/${id}`,
//       //   {params : {userId: userId }}
//       // );
//       // if (res.data.status) navigate("/login");
//       // else {
//       //   setLike(res.data.liked);
//       // }
//       if (!like) {
//         try {
//           var res = await axios.put(
//             `http://localhost:3001/api/movie/like/${id}`,
//             { userId: userId }
//           );
//           if (res.status === 200) {
//             setLike(true);
//             document.getElementById("like_button").style.color = "red";
//           }
//         } catch (err) {
//           console.log(err);
//         }
//       } else {
//         try {
//           var resd = await axios.delete(
//             `http://localhost:3001/api/movie/like/${id}`,
//             { userId: userId }
//           );
//           if (resd.status === 200) {
//             setLike(false);
//             document.getElementById("like_button").style.color = "white";
//           }
//         } catch (err) {
//           console.log(err);
//         }
//       }
//     } else {
//       alert("User not Logged In Please Login");
//       navigate("/login");
//     }
//   }
//   async function checkLikes(id){
//     var res = await axios.get(
//       `http://localhost:3001/api/movie/like/${id}`,
//       {params : {userId: userId }}
//     );
//     console.log(res.data.liked)
//     if (res.data.liked===true){
//       setLike(true);
//        return true;
//       } 
//     if (res.data.liked===false){ 
//       setLike(false)
//       return false
//     } 
//   }
//   function addComment(id) {
//     const token = localStorage.getItem("token");
//     axios
//       .put(
//         `http://localhost:3001/api/movie/comment/${id}`,
//         { comment: comment, userId: userId }
//       )
//       .then((res) => {
//         if (res.data.status) navigate("/login");
//         else {
//           setMovie(res.data);
//           setComment("");
//         }
//       })
//       .catch((err) => console.log(err));
//   }

//   function getCom(id) {
//     const token = localStorage.getItem("token");
//     axios
//       .get(
//         `http://localhost:3001/api/movie/comments/${id}`,
//         { userId: userId }
//       )
//       .then((res) => {
//         setgetComments(res.data);
//       })
//       .catch((err) => console.log(err));
//   }
//   // async function getLikes(){
//   //   const {id}=params
//   //   try{
//   //     const response =await axios.get(`http://localhost:3001/api/admin/movie/like/${id}`)
//   //     console.log(response.data)
//   //     setLikes(response.data)
//   //   }
//   //   catch(err){
//   //     console.log(err)
//   //   }
//   // }

//   return (
// <div>
// <div className="d-flex justify-content-center align-items-center mt-5">
//       <div className="card m-3 text-white bg-black bg-opacity-50" style={{ maxWidth: '800px' }}>
//         <div className="row g-0">
//           <div className="col-md-4 d-flex align-items-center justify-content-center">
//             <img
//               style={{ height: "300px", width: "auto" }}
//               decoding="async"
//               className="img-fluid rounded-start border"
//               src={`${posterURL}${movie.moviePosterName}`}
//               alt={movie.movieName}
//             />
//           </div>
//           <div className="col-md-8">
//             <div className="card-body">
//               <p className=""><span className=" poetsen-one-regular h1">{movie.movieName} </span><span> ({movie.releaseYear})</span></p>
//               <p className="m-0 p-0"><strong>Genre:</strong> {movie.genre}</p>
//               <p className="m-0 p-0"><strong>Language:</strong> {movie.language}</p>
//               <p className="m-0 p-0"><strong>Release Year:</strong> {movie.releaseYear}</p>
//               <p className="m-0 p-0"><strong>Cast:</strong> {movie.movieCast}</p>
//               <p className="m-0 p-0"><strong>Description:</strong> {movie.description}</p>
              
//               <div className="d-flex align-items-center">
//                 <AiFillLike
//                   onClick={() => handleLike(movie._id)}
//                   id="like_button"
//                   style={{ cursor: "pointer", fontSize: "24px" }}
//                   className={like ? "text-danger me-2" : ""}
//                 />
//                 <p>{like}</p>
//                 <h6 className="pt-2">{likecnt.Likes}</h6>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     <div className="container mb-5 pb-5" style={{ maxWidth: '600px' }}>
//       <Form.Group controlId="comment" className="mb-4">
//         <Form.Label className="fw-bold">Comment:</Form.Label>
//         <Form.Control
//           type="text"
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//           placeholder="Enter your comment here"
//         />
//       </Form.Group>
//       <Button
//         variant="primary"
//         className="me-2"
//         onClick={() => addComment(movie._id)}
//       >
//         Submit Comment
//       </Button>
//       <Button
//         variant="secondary"
//         onClick={() => getCom(movie._id)}
//       >
//         Get Comments
//       </Button>
//       <div className="mt-5">
//         <h3 className="mb-3">Comments</h3>
//         {getComments.map((comment) => (
//           <div key={comment._id} className="my-3">
//             <div className="fw-bold">{comment.commentedUser.username}</div>
//             <div>{comment.comment}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//       </div>
//   );
// }

// export default SingleMovieComponent;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { AiFillLike } from "react-icons/ai";
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
  const [getComments, setgetComments] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false); // State to track video playback

  useEffect(() => {
    const { id } = params;
    axios
      .get(`http://localhost:3001/api/movie/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err));

    axios.get(`http://localhost:3001/api/movie/likecnt/${id}`)
      .then((res) => {
        setLikecnt(res.data);
      })
      .catch((err) => console.log(err));
  }, [params, like]);

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
        setgetComments(res.data);
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
          <div className="card text-white bg-black bg-opacity-50">
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
                <AiFillLike
                  onClick={() => handleLike(movie._id)}
                  id="like_button"
                  style={{ cursor: "pointer", fontSize: "24px" }}
                  className={like ? "text-danger me-2" : ""}
                />
                <p>{likecnt.Likes} Likes</p>
              </div>

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
              <Button variant="primary" className="me-2" onClick={() => addComment(movie._id)}>
                Submit Comment
              </Button>
              <Button variant="secondary" onClick={() => getCom(movie._id)}>
                Get Comments
              </Button>

              {/* Display Comments */}
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
        </Col>
      </Row>
    </Container>
  );
}

export default SingleMovieComponent;
