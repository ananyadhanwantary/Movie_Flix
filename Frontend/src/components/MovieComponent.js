import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios'
function MovieComponent() {
    const [movies, setMovies ] = useState([])
    // async function handleMovie(e) {
    //     e.preventDefault()
    //     try {
    //          movies = await axios.get("http://localhost:3001/api/movie/")
    //          console.log(movies.data)
    //     }
    //     catch (err) {
    //         console.log(err)
    //     }
    // }
    // useEffect(() => {
    //     try {
    //         console.log("gjyg")
    //         axios.get("http://localhost:3001/api/movie/")
    //         .then(response=>setMovies(response.data))
    //     }
    //     catch (err) {
    //         console.log(err)
    //     }

    // }, [movies])
    useEffect(()=>{
        axios.get("http://localhost:3001/api/movie/")
            .then(response=>setMovies(response.data))
    },[])

   const  readMovies=()=>{
        
    }
    return (
        <>
            {movies.map((movie) =>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={movie.moviePosterUrl} />
                    <Card.Body>
                        <Card.Title>{movie.movieName}</Card.Title>
                        <Card.Text>
                            {movie.Cast}
                        </Card.Text>
                        <Button variant="primary">Play Movie</Button>
                    </Card.Body>
                </Card>
            )}
            <button onClick={readMovies}>Read</button>
        </>
    )

}
export default MovieComponent