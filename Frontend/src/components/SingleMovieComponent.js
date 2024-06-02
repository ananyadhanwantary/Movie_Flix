// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Button, Col, Container, Form, Row } from "react-bootstrap";
// import { AiFillLike } from "react-icons/ai";
// import { useAuth } from "../providers/AuthProvider";
// //import { faCoffee } from '@fortawesome/free-solid-svg-icons'

// import { useNavigate, useParams } from "react-router-dom";

// function SingleMovieComponent() {
//   const navigate = useNavigate();
//   const params = useParams();
//   var { userId } = useAuth();
//   var [movie, setMovie] = useState({});
//   var [like, setLike] = useState(false);
//   var [comment, setComment] = useState("");
//   const [getComments, setgetComments] = useState([]);
//   useEffect(() => {
//     const { id } = params;
//     axios
//       .get(`http://localhost:3001/api/movie/${id}`)
//       .then((res) => setMovie(res.data))
//       .catch((err) => console.log(err));
//   });
//   async function handleLike(id) {
//     const token = localStorage.getItem("token");
//     // console.log(token)
//     if (token) {
//       var res = await axios.get(
//         `http://localhost:3001/api/movie/like/${id}`,
//         { userId: userId },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       if (res.data.status) navigate("/login");
//       else {
//         setLike(res.data.liked);
//       }
//       if (!like) {
//         try {
//           // console.log(token," from try in if")
//           res = await axios.put(
//             `http://localhost:3001/api/movie/like/${id}`,
//             { userId: userId },
//             { headers: { Authorization: `Bearer ${token}` } }
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
//           res = await axios.delete(
//             `http://localhost:3001/api/movie/like/${id}`,
//             { userId: userId },
//             { headers: { Authorization: `Bearer ${token}` } }
//           );
//           if (res.status === 200) {
//             setLike(false);
//             document.getElementById("like_button").style.color = "black";
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
//   function addComment(id) {
//     const token = localStorage.getItem("token");
//     axios
//       .put(
//         `http://localhost:3001/api/movie/comment/${id}`,
//         { comment: comment, userId: userId },
//         { headers: { Authorization: `Bearer ${token}` } }
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
//         { userId: userId },
//         { headers: { Authorization: `Bearer ${token}` } }
//       )
//       .then((res) => {
//         setgetComments(res.data);
//       })
//       .catch((err) => console.log(err));
//   }
//   return (
//     <>
//       <br />
//       <br />
//       <br />
//       <Container>
//         <Row className="justify-content-center">
//           <Col xs={12} md={6}>
//             <img
//               src={movie.moviePosterUrl}
//               alt="Movie Poster"
//               className="img-fluid w-25"
//             />
//             <h1>{movie.movieName}</h1>
//             <p>{movie.movieCast}</p>
//             <AiFillLike
//               onClick={() => handleLike(movie._id)}
//               id="like_button"
//             />
//             <Form.Group controlId="comment">
//               <Form.Label>Comment:</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={comment}
//                 onChange={(e) => setComment(e.target.value)}
//               />
//             </Form.Group>
//             <Button
//               className="ms-2"
//               variant="primary"
//               onClick={() => addComment(movie._id)}
//             >
//               Submit Comment
//             </Button>
//             <Button
//               className="ms-2"
//               variant="secondary"
//               onClick={() => getCom(movie._id)}
//               onChange={(e) => {
//                 setgetComments(e.target.value);
//               }}
//             >
//               Get Comment
//             </Button>
//             {getComments.map((comment) => (
//               <div>
//                 <div>{comment.commentedUser.username}</div>
//                 <div>{comment.comment}</div>
//               </div>
//             ))}
//           </Col>
//         </Row>
//       </Container>

//       <br />
//       <br />
//       <br />
//     </>
//   );
// }
// export default SingleMovieComponent;

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
  const [comment, setComment] = useState("");
  const [getComments, setgetComments] = useState([]);
  useEffect(() => {
    const { id } = params;
    axios
      .get(`http://localhost:3001/api/movie/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err));
  },[params]);

  async function handleLike(id) {
    const token = localStorage.getItem("token");
    if (token) {
      var res = await axios.get(
        `http://localhost:3001/api/movie/like/${id}`,
        { userId: userId }
      );
      if (res.data.status) navigate("/login");
      else {
        setLike(res.data.liked);
      }
      if (!like) {
        try {
          res = await axios.put(
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
          res = await axios.delete(
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
    <div >
    <br />
    <br />
      <Container className="py-5 fw-bolder ">
        <Row className="justify-content-center">
          <Col xs={12} md={6} className="text-center">
            <img
              src={movie.moviePosterUrl}
              alt="Movie Poster"
              className="img-fluid mb-4 rounded"
            />
            <h1 className="mb-3">{movie.movieName}</h1>
            <p className=" mb-4">{movie.movieCast}</p>
            {/* <div className="mt-2">
              <h3 className="mb-2">Cast</h3>
              <ul className="list-unstyled">
                {movie.movieCast.map((actor,index) => (
                  <li key={index}>{actor}</li>
                ))}
              </ul>
            </div> */}
            <AiFillLike
              onClick={() => handleLike(movie._id)}
              id="like_button"
              style={{ cursor: "pointer", fontSize: "24px" }}
              className={like ? "text-danger mb-4" : "mb-4"}
            />
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
          </Col>
        </Row>
      </Container>
      <br />
      <br />
    </div>
  );
}

export default SingleMovieComponent;

