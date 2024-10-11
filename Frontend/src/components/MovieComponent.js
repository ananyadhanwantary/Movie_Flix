import DropDown from "./DropDown";
import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CardComponent from "./CardComponent";

const posterURL = process.env.REACT_APP_posterURL;

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

  // This function now passes the selected movie as state when navigating
  function handleSingleMovie(movie) {
    navigate(`/getMovie/${movie._id}`, { state: { movie } });
  }

  return (
    <div className="movie-component m-3">
      <br />
      <br />
      <br />
      <Container fluid className="">
        <Row className="justify-content-start">
          {movies.map((movie) => (
            <Col key={movie._id} xs={12} sm={6} md={4} lg={3} className="m-4">
              <CardComponent movie={movie} handleSingleMovie={handleSingleMovie} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default MovieComponent;
