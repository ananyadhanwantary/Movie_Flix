import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios'
function MovieComponent() {
    const{movies,setMovies}=useState("")
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
    useEffect(async ()=>{
        try {
            console.log("gjyg")
            movies = await axios.get("http://localhost:3001/api/movie/")
            console.log(movies.data)
       }
       catch (err) {
           console.log(err)
       }

    },[])
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
        </>
    )

}
export default MovieComponent