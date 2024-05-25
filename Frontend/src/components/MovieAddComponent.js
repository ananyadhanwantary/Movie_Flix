import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"
import { Form, Button } from 'react-bootstrap';
function MovieAddComponent(){
    const navigate = useNavigate()
        const [movies, setMovies] = useState([])
        const [newMovie, setNewMovie] = useState({
            movieName: "",
            movieUrl: "",
            moviePosterUrl: "",
            genre: "",
            movieCast: []
        })
    async function handleaddMovie(e) {
        e.preventDefault()
        try{
            const token = localStorage.getItem("token")
            var res = await axios.post(`http://localhost:3001/api/admin/movie/`,newMovie,{ headers: {"Authorization" : `Bearer ${token}`} })
            if(res.data.status===false){
                if(res.data.login===false){
                    alert("please Login to proceed")
                    navigate("/login")
                }
                else if(res.data.role==="user"){
                    alert("You are not authorized to perform ths operation")
                }
            }
            else{
                setMovies([...movies,res.data.movie])
                setNewMovie({
                    movieName:"",
                    movieUrl:"",
                    moviePosterUrl:"",
                    genre: "",
                    movieCast:[]
                })
                navigate("/admin/movie")
            }
        }
        catch(err){
            console.log(err)
        }
    }
    return(
        <>
        <Form>
            <Form.Group controlId="movieName">
                <Form.Label>Movie Name:</Form.Label>
                <Form.Control type="text" placeholder="Enter movie name" value={newMovie.movieName} onChange={(e) => {
                    setNewMovie((previousMovie) => ({
                        ...previousMovie,
                        movieName: e.target.value
                    }));
                }} />
            </Form.Group>

            <Form.Group controlId="movieUrl">
                <Form.Label>Movie Url:</Form.Label>
                <Form.Control type="text" placeholder="Enter movie URL" value={newMovie.movieUrl} onChange={(e) => {
                    setNewMovie((previousMovie) => ({
                        ...previousMovie,
                        movieUrl: e.target.value
                    }));
                }} />
            </Form.Group>

            <Form.Group controlId="moviePosterUrl">
                <Form.Label>Movie Poster Url:</Form.Label>
                <Form.Control type="text" placeholder="Enter movie poster URL" value={newMovie.moviePosterUrl} onChange={(e) => {
                    setNewMovie((previousMovie) => ({
                        ...previousMovie,
                        moviePosterUrl: e.target.value
                    }));
                }} />
            </Form.Group>

            <Form.Group controlId="genre">
                <Form.Label>Genre:</Form.Label>
                <Form.Control type="text" placeholder="Enter genre" value={newMovie.genre} onChange={(e) => {
                    setNewMovie((previousMovie) => ({
                        ...previousMovie,
                        genre: e.target.value
                    }));
                }} />
            </Form.Group>

            <Form.Group controlId="movieCast">
                <Form.Label>Movie Cast:</Form.Label>
                <Form.Control type="text" placeholder="Enter movie cast" value={newMovie.movieCast} onChange={(e) => {
                    setNewMovie((previousMovie) => ({
                        ...previousMovie,
                        movieCast: e.target.value
                    }));
                }} />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={(e) => handleaddMovie(e)}>Submit</Button>
        </Form>

        </>
    )

}
export default MovieAddComponent