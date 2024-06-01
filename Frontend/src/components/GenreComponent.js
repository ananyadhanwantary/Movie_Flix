import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from "axios"
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
function GenreComponent(){
    const location=useLocation()
    //console.log(location)
    const { state } = location;   
    //console.log(state)
    const [movies,setMovies]=useState([])
    const g=state.movieGenre
    //console.log(g)
    useEffect(()=>{
        //console.log("ged")
        try{
            //console.log("try block")
            axios.get(`http://localhost:3001/api/admin/movie/bygenre/${g}`)
            .then((response)=>{
                //console.log("then block")
                //console.log(response.data)
                setMovies(response.data)
        })
        }
        catch(err){
            console.log(err)
        }
        
    },[])
    return(
        <>
        <div className="container d-flex justify-content-center align-content-center">
            <div className="row justify-content-center">
                {movies.map((movie) =>
                    <div className="col-lg p-3"  key={movie._id}>
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
                    </div>
                )}
            </div>
        </div>
        </>

    )
}
export default GenreComponent