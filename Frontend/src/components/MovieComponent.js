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

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import GenreCategoryComponent from './GenreCategoryComponent';

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
            console.log(id);
            navigate(`/getMovie/${id}`);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Container className="mt-4">
            <br/><br/>
            <Row>
                <Col sm={2}>
                    <GenreCategoryComponent />
                </Col>
                <Col sm={10}>
                    <Row xs={1} md={2} lg={3} className="justify-content-center">
                        {movies.map((movie) => (
                            <Col key={movie._id} className="mb-3">
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={movie.moviePosterUrl} />
                                    <Card.Body>
                                        <Card.Title>{movie.movieName}</Card.Title>
                                        <Card.Text>{movie.movieCast}</Card.Text>
                                        <Button onClick={() => handleSingleMovie(movie._id)} variant="primary">See More</Button>
                                        <Button className="ms-2" variant="secondary">Play Movie</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default MovieComponent;
