import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios'
function MovieComponent() {
    const [movies, setMovies ] = useState([])
    useEffect(() => {
        try {
            axios.get("http://localhost:3001/api/movie/")
            .then(response=>setMovies(response.data))
        }
        catch (err) {
            console.log(err)
        }

     }, [movies])
    return (
        <>
            {movies.map((movie) =>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={movie.moviePosterUrl} />
                    <Card.Body>
                        <Card.Title>{movie.movieName}</Card.Title>
                        <Card.Text>
                            {movie.movieCast}
                        </Card.Text>
                        <Button variant="primary">Play Movie</Button>
                    </Card.Body>
                </Card>
            )}
        </>
    )

}
export default MovieComponent