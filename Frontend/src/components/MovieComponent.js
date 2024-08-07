// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import { useNavigate } from 'react-router-dom';
// import GenreCategoryComponent from './GenreCategoryComponent'
// function MovieComponent() {
//     const navigate = useNavigate()
//     const [movies, setMovies] = useState([])
//     useEffect(() => {
//         try {
//             axios.get("http://localhost:3001/api/movie/")
//                 .then(response => setMovies(response.data))
//         }
//         catch (err) {
//             console.log(err)
//         }

//     }, [movies])

//     async function handleSingleMovie(id) {
//         //console.log(movie)
//         try {
//             console.log(id)
//             navigate(`/getMovie/${id}`)
//         } catch (err) {
//             console.log(err)
//         }
//     }
//     return (
//         <>
//         <GenreCategoryComponent></GenreCategoryComponent>
//         <div className="container d-flex justify-content-center align-content-center">
//             <div className="row justify-content-center">
//                 {movies.map((movie) =>
//                     <div className="col-lg p-3"  key={movie._id}>
//                         <Card style={{ width: '18rem' }}>
//                             <Card.Img variant="top" src={movie.moviePosterUrl} />
//                             <Card.Body>
//                                 <Card.Title>{movie.movieName}</Card.Title>
//                                 <Card.Text>
//                                     {movie.movieCast}
//                                 </Card.Text>
//                                 <Card.Link onClick={() => handleSingleMovie(movie._id)}>See More</Card.Link>
//                                 <br /><br />
//                                 <Button variant="primary">Play Movie</Button>
//                             </Card.Body>
//                         </Card>
//                     </div>
//                 )}
//             </div>
//         </div>
//         </>
//     )

// }
// export default MovieComponent
import DropDown from "./DropDown";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import GenreCategoryComponent from "./GenreCategoryComponent";

function MovieComponent() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await axios.get("http://localhost:3001/api/movie/");
        setMovies(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchMovies();
  }, []);
  function handleSingleMovie(id) {
    try {
      navigate(`/getMovie/${id}`);
    } catch (err) {
      console.log(err);
    }
  }

  return (
<div>
      {/* <div className="dropdown-container mt-5">
        <DropDown />
      </div> */}
      <Container className="container-custom">
        <Row className="custom-row">
          {movies.map((movie, index) => (
            <Col key={movie._id} xs={12} sm={6} md={4} lg={2} className="custom-col mb-4">
              <Card className="card-custom">
                <Card.Img variant="top" src={movie.moviePosterUrl} />
                <Card.Body className="card-body-custom">
                  <div className="card-content">
                    <Card.Title className="card-title-custom fs-6">{movie.movieName}</Card.Title>
                    <Card.Text className="card-text-custom fs-7">{movie.movieCast.join(', ')}</Card.Text>
                  </div>
                  <div className="button-group-custom p-1">
                    <Button className="custom-button" onClick={() => handleSingleMovie(movie._id)} variant="primary" size="sm">See More</Button>
                    <Button className="custom-button ms-2" variant="secondary" href={movie.movieUrl} size="sm">Play Movie</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default MovieComponent;
