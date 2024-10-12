import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const posterURL = process.env.REACT_APP_posterURL;

const SearchComponent = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState([])
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };
  useEffect(() => {
    async function handleSearchBar(query) {
      try {
        const response = await axios.get(`http://localhost:3001/api/movie/search?search=${query}`)
        console.log(response.data)
        setSearch(response.data)
      }
      catch (err) {
        console.log(err)
      }
    }
    handleSearchBar(query)
  }, [query])
  function handleSingleMovie(id) {
    try {
      console.log(id);
      navigate(`/getMovie/${id}`);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='mt-5'>
      {/* <input 
        type="search" 
        value={query} 
        onChange={handleInputChange} 
        placeholder="Search for a movie..." 
      /> */}
      <div className='d-flex justify-content-end pe-5 me-5 align-content-center'>
      <input
        type="search"
        className=''
        value={query}
        onChange={handleInputChange}
        placeholder="Search for a movie..."
        style={{
          width: "25%",
          padding: "10px 15px",
          borderRadius: "5px",
          border: "1px solid #ced4da",
          fontSize: "16px",
          outline: "none",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      />
      </div>
      <Container className="container-custom">
        <Row className="custom-row">
          {search.map((movie, index) => (
            <Col key={movie._id} xs={12} sm={6} md={4} lg={2} onClick={() => handleSingleMovie(movie._id)} className="custom-col-lg custom-col mb-4">
              <Card className="card-custom">
                <Card.Img variant="top" src={`${posterURL}${movie.moviePosterName}`} />
                <Card.Body className="card-body-custom">
                  <div className="card-content">
                    <Card.Title className="card-title-custom fs-6">{movie.movieName} ({movie.releaseYear})</Card.Title>
                    {/* <Card.Text className="card-text-custom fs-7">{movie.movieCast.join(', ')}</Card.Text> */}
                  </div>
                  {/* <div className="button-group-custom">
                    <Button className="custom-button"  variant="primary" size="sm">See More</Button>
                    <Button className="custom-button ms-2" variant="secondary" href={movie.movieUrl} size="sm">Play Movie</Button>
                  </div> */}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      {/* <button onClick={handleSearch}>Search</button> */}
    </div>
  );
};

export default SearchComponent;
