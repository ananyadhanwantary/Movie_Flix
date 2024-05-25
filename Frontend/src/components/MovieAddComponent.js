import axios from "axios";
import { useState } from "react";
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
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
    async function handleAddMovie(e) {
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
        <br/><br/>
        <Container className="border border-black">
            <h1 className="text-center fw-bolder">ADD MOVIE</h1>
        <Form className="center" style={{ maxWidth: "1000px", margin: "auto" }}>
            <Form.Group controlId="movieName">
                <Form.Label>Movie Name:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter movie name"
                    value={newMovie.movieName}
                    onChange={(e) => setNewMovie((previousMovie) => ({ ...previousMovie, movieName: e.target.value }))}
                />
            </Form.Group>

            <Form.Group controlId="movieUrl">
                <Form.Label>Movie Url:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter movie URL"
                    value={newMovie.movieUrl}
                    onChange={(e) => setNewMovie((previousMovie) => ({ ...previousMovie, movieUrl: e.target.value }))}
                />
            </Form.Group>

            <Form.Group controlId="moviePosterUrl">
                <Form.Label>Movie Poster Url:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter movie poster URL"
                    value={newMovie.moviePosterUrl}
                    onChange={(e) => setNewMovie((previousMovie) => ({ ...previousMovie, moviePosterUrl: e.target.value }))}
                />
            </Form.Group>

            <Form.Group controlId="genre">
                <Form.Label>Genre:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter genre"
                    value={newMovie.genre}
                    onChange={(e) => setNewMovie((previousMovie) => ({ ...previousMovie, genre: e.target.value }))}
                />
            </Form.Group>

            <Form.Group controlId="movieCast">
                <Form.Label>Movie Cast:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter movie cast"
                    value={newMovie.movieCast}
                    onChange={(e) => setNewMovie((previousMovie) => ({ ...previousMovie, movieCast: e.target.value }))}
                />
            </Form.Group>
            <br/><br/>
            <Button variant="primary" type="submit" onClick={handleAddMovie}>
                Submit
            </Button>
        </Form>
        <br/>
        </Container>
        <br/><br/>
        </>
    )

}
export default MovieAddComponent