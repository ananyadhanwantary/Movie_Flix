import DropDown from "./DropDown";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CardComponent from "./CardComponent";
const posterURL = process.env.REACT_APP_posterURL

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
      <Container className="container-custom">
        <Row className="custom-row">
          {movies.map((movie) => (
            <Col key={movie._id} xs={12} sm={6} md={4} lg={2} className="custom-col mb-4">
              <CardComponent movie={movie}/>
              
              {/* <Card className="card-custom">
                <Card.Img variant="top" src={`${posterURL}${movie.moviePosterName}`} />
                <Card.Body className="card-body-custom">
                  <div className="card-content">
                    <Card.Title className="card-title-custom fs-6">{movie.movieName} ({movie.releaseYear})</Card.Title>
                    <Card.Text className="card-text-custom fs-6">Genre: {movie.genre}</Card.Text>
                    <Card.Text className="card-text-custom fs-6">{movie.description}</Card.Text>
                  </div>
                  <div className="button-group-custom p-1">
                    <Button className="custom-button" onClick={() => handleSingleMovie(movie._id)} variant="primary" size="sm">See More</Button>
                    <Button className="custom-button ms-2" variant="secondary" href={movie.movieUrl} size="sm">Play Movie</Button>
                  </div>
                </Card.Body>
              </Card> */}
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default MovieComponent;
