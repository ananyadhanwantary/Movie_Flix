import DropDown from "./DropDown";
import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import CardComponent from "./CardComponent";
const API_URL = process.env.REACT_APP_API_URL


function MovieComponent() {
  const location = useLocation();
  const { state } = location;
  const [movies, setMovies] = useState([]);
  const g = state.movieGenre;
  const l = state.movieLanguage;

  useEffect(() => {
    async function fetchMoviesByGenre() {
      try {
        const response = await axios.get(`${API_URL}api/movie/byFilter/${g}/${l}`);
        setMovies(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchMoviesByGenre();
  }, [g, l]);

  return (
    <div className="movie-component m-3 vh-100">
      <div className="dropdown-container mt-5 ms-4">
      <DropDown />
      </div>
      <Container fluid className="">
        <Row className="justify-content-start">
          {movies.map((movie) => (
            <Col key={movie._id} xs={12} sm={6} md={4} lg={3} className="my-4">
              <CardComponent movie={movie}  />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default MovieComponent;
