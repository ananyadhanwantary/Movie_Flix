import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const SearchComponent = () => {
const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [search,setSearch]=useState([])
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };
  useEffect(() => {
    async function handleSearchBar(query){
        try{
          const response=await axios.get(`http://localhost:3001/api/movie/search?search=${query}`)
          console.log(response.data)
          setSearch(response.data)
        }
        catch(err){
          console.log(err)
        }
      }
    handleSearchBar(query)
  },[query])
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
      <input 
        type="search" 
        value={query} 
        onChange={handleInputChange} 
        placeholder="Search for a movie..." 
      />
      <Container className="container-custom">
        <Row className="">
          {search.map((movie, index) => (
            <Col key={movie._id} xs={12} sm={6} md={4} lg={2} className="mb-4">
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
      {/* <button onClick={handleSearch}>Search</button> */}
    </div>
  );
};

export default SearchComponent;
