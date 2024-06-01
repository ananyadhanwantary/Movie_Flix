// import 'bootstrap/dist/css/bootstrap.min.css';
// import React from 'react';

// function HomeComponent(){
//     return(
//         <>
//             <center>
//                 <h1>Movie-Flix</h1>
//             </center>
//         </>
//     )
// }
// export default HomeComponent;

// import 'bootstrap/dist/css/bootstrap.min.css';
// import React from 'react';

// function HomeComponent() {
//     return (
//         <div className="container">
//         <div className="row">
//             <div className="col">
//             <h1 className="text-center">Movie-Flix</h1>
//             </div>
//         </div>
//         </div>
//     );
// }

// export default HomeComponent;

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
function HomeComponent() {
    const navigate=useNavigate()
    async function handleGetMovie(e){
        e.preventDefault()
        try{
          navigate("/getMovie")
        }
        catch(err){
          console.log(err)
        }
      }
    return (
      <>
        <div className="container-fluid bg-dark text-light py-5">
        <div className="row">
            <div className="col text-center">
            <h1 className="display-3">Movie-Flix</h1>
            <p className="lead">Your Ultimate Movie Streaming Solution</p>
            <button className="btn btn-primary btn-lg" onClick={(e)=>handleGetMovie(e)}>Explore Now</button>
            </div>
        </div>
        </div>
        <Carousel>
      <Carousel.Item>
        <ExampleCarouselImage text="First slide" />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage text="Second slide" />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage text="Third slide" />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
        </>
    );
}

export default HomeComponent;

