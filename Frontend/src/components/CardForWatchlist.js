import React from "react";
import { Card,Button } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
const CardForWatchlist = ({ movieId, movie, eventHandler}) => {
  const [mov, setMov] = useState({});
  const posterURL = process.env.REACT_APP_posterURL;
  const API_URL = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();

  useEffect(() => {
    if(movieId){
      axios
        .get(`${API_URL}api/movie/${movieId}`)
        .then((res) => setMov(res.data))
        .catch((err) => console.log(err));
    }
    else{
      setMov(movie);
    }
  }, [API_URL, movie, movieId]);

  function handleSingleMovie(movie) {
    navigate(`/getMovie/${movie._id}`, { state: { movie } }); 
  }

  return (
    <>
      <Card className="card-custom" >
        <Card.Img variant="top" src={`${posterURL}${mov.moviePosterName}`} onClick={() => handleSingleMovie(mov)} />
        <Card.Body className="card-body-custom p-2">
          <div className="card-content" onClick={() => handleSingleMovie(mov)}>
            <Card.Title className="card-title-custom fs-6">
              {mov.movieName} ({mov.releaseYear})
            </Card.Title>
          </div>
          { eventHandler ?
          <div className="button-group-custom">
            <Button className="custom-button" variant="danger" size="sm" onClick={() => eventHandler(movieId)}>Remove</Button>
          </div> : <></>
          }
        </Card.Body>
        
      </Card>
    </>
  );
};

export default CardForWatchlist;
