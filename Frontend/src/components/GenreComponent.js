// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import axios from "axios"
// import { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// function GenreComponent(){
//     const location=useLocation()
//     //console.log(location)
//     const { state } = location;   
//     //console.log(state)
//     const [movies,setMovies]=useState([])
//     const g=state.movieGenre
//     //console.log(g)
//     useEffect(()=>{
//         //console.log("ged")
//         try{
//             //console.log("try block")
//             axios.get(`http://localhost:3001/api/admin/movie/bygenre/${g}`)
//             .then((response)=>{
//                 //console.log("then block")
//                 //console.log(response.data)
//                 setMovies(response.data)
//         })
//         }
//         catch(err){
//             console.log(err)
//         }
        
//     },[])
//     return(
//         <>
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
// export default GenreComponent

import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import GenreCategoryComponent from "./GenreCategoryComponent";

function GenreComponent() {
    const location = useLocation();
    const { state } = location;
    const [movies, setMovies] = useState([]);
    const g = state.movieGenre;

    useEffect(() => {
        async function fetchMoviesByGenre() {
            try {
                const response = await axios.get(`http://localhost:3001/api/admin/movie/bygenre/${g}`);
                setMovies(response.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchMoviesByGenre();
    }, [g]);

    return (
        <Container className="mt-4">
            <br/><br/>
            <Row>
                <Col md={2} className="mb-3">
                    <GenreCategoryComponent />
                </Col>
                <Col md={10}>
                    <Row xs={1} md={2} lg={3} className="justify-content-center">
                        {movies.map((movie) => (
                            <Col key={movie._id} className="mb-3">
                                <Card style={{ width: "18rem" }}>
                                    <Card.Img variant="top" src={movie.moviePosterUrl} />
                                    <Card.Body>
                                        <Card.Title>{movie.movieName}</Card.Title>
                                        <Card.Text>{movie.movieCast}</Card.Text>
                                        <Button variant="primary">Play Movie</Button>
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

export default GenreComponent;
