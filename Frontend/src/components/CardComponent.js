import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/CardComponent.css'; // Assuming you put the custom styles in this file
const posterURL = process.env.REACT_APP_posterURL
const CardComponent = ({movie}) => {
    console.log(movie)
    return (
        <div className="d-flex justify-content-center align-items-center ">
            <div className="card-container">
                <div className="card slide1">
                    <div  >
                        <img variant="top" className="position-absolute top-0 start-0 w-100" src={`${posterURL}${movie.moviePosterName}`} />
                    </div>
                </div>
                <div className="card slide2">
                    <div className="card-content text-center">
                    <p className="card-title-custom fs-6">{movie.movieName} ({movie.releaseYear})</p>
                    <p className="card-text-custom fs-6">Genre: {movie.genre}</p>
                    <p className="card-text-custom fs-6">{movie.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardComponent;
