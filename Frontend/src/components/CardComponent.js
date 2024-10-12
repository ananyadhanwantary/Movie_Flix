import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CardComponent.css';
const posterURL = process.env.REACT_APP_posterURL;

const CardComponent = ({ movie }) => {
  const navigate = useNavigate();
  
  function handleSingleMovie(movie) {
    navigate(`/getMovie/${movie._id}`, { state: { movie } }); 
  }

  return (
    <div className="card-container" onClick={() => handleSingleMovie(movie)}>
      <div className="movie-card">
        <div className="movie-poster">
          <img className="poster-img" src={`${posterURL}${movie.moviePosterName}`} alt={movie.movieName} />
          {/* <h5 className="movie-title-front text-black">{movie.movieName} ({movie.releaseYear})</h5> */}
        </div>
        <div className="movie-details">
          <div className='details-content'>
          <h5 className="movie-title">{movie.movieName} ({movie.releaseYear})</h5>
          <p className="movie-genre">Genre: {movie.genre}</p>
          <p className="movie-language">Lang: {movie.language}</p>
          <p className="movie-description">
            {movie.description && movie.description.length > 0 
              ? (movie.description.length > 100 ? movie.description.slice(0, 100) + '...see more' : movie.description) 
              : 'No description available'}
          </p>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default CardComponent;
