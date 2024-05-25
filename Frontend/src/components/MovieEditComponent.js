import axios from "axios"
import { useState } from "react"
import { Form, Button } from 'react-bootstrap';
// import { Form, Button } from 'react-bootstrap';
function MovieEditComponet(){
    const navigate=useNavigate()
    const params=useParams()
    //const movie=params.id
    // const [movies, setMovies] = useState([movie])
    //console.log(movie,movies)
    const [newMovie,setNewMovie]= useState({
        // movieName:movies.movieName,
        // movieUrl:movies.movieUrl,
        // moviePosterUrl:movies.moviePosterUrl,
        // genre: movies.genre,
        // movieCast:movies.movieCast
    })
    // console.log(newMovie)
    async function handleEdit(e){
        e.preventDefault()
        try{
            const {id}=params
            console.log(id)
            const token = localStorage.getItem("token")
            var res = await axios.patch(`http://localhost:3001/api/admin/movie/${id}`,newMovie,{ headers: {"Authorization" : `Bearer ${token}`} })
            console.log(res.data)
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
                
                //setMovies([...movies,res.data.movie])
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
    async function handleUpdateAction(id){
        try{
            const token = localStorage.getItem("token")
            var res = await axios.get(`http://localhost:3001/api/admin/movie/${id}`,newMovie,{ headers: {"Authorization" : `Bearer ${token}`} })
            setNewMovie(res.data)
        }
        catch(err){
            console.log(err)
        }
    }
    return(
        <>

{/* <Form>
    <Form.Group controlId="movieName">
        <Form.Label>Movie Name:</Form.Label>
        <Form.Control type="text" value={newMovie.movieName} onChange={(e)=>{
            setNewMovie((previousMovie)=>{
                return {
                    ...previousMovie,
                    movieName:e.target.value
                }
            })
        }}/>
    </Form.Group>

    <Form.Group controlId="movieUrl">
        <Form.Label>Movie Url:</Form.Label>
        <Form.Control type="text" value={newMovie.movieUrl} onChange={(e)=>{
            setNewMovie((previousMovie)=>{
                return {
                    ...previousMovie,
                    movieUrl:e.target.value
                }
            })
        }}/>
    </Form.Group>

    <Form.Group controlId="moviePosterUrl">
        <Form.Label>Movie Poster Url:</Form.Label>
        <Form.Control type="text" value={newMovie.moviePosterUrl} onChange={(e)=>{
            setNewMovie((previousMovie)=>{
                return {
                    ...previousMovie,
                    moviePosterUrl:e.target.value
                }
            })
        }}/>
    </Form.Group>

    <Form.Group controlId="genre">
        <Form.Label>Genre:</Form.Label>
        <Form.Control type="text" value={newMovie.genre} onChange={(e)=>{
            setNewMovie((previousMovie)=>{
                return {
                    ...previousMovie,
                    genre:e.target.value
                }
            })
        }}/>
    </Form.Group>

    <Form.Group controlId="movieCast">
        <Form.Label>Movie Cast:</Form.Label>
        <Form.Control type="text" value={newMovie.movieCast} onChange={(e)=>{
            setNewMovie((previousMovie)=>{
                return {
                    ...previousMovie,
                    movieCast:e.target.value
                }
            })
        }}/>
    </Form.Group>

    <Button variant="primary" type="submit" onClick={(e)=>handleEdit(e)}>Submit</Button>
</Form> */}

<Form className>
    <Form.Group controlId="movieName">
        <Form.Label>Movie Name:</Form.Label>
        <Form.Control type="text" value={newMovie.movieName} onChange={(e)=>{
            setNewMovie((previousMovie)=>{
                return {
                    ...previousMovie,
                    movieName:e.target.value
                }
            })
        }}/>
    </Form.Group>

    <Form.Group controlId="movieUrl">
        <Form.Label>Movie Url:</Form.Label>
        <Form.Control type="text" value={newMovie.movieUrl} onChange={(e)=>{
            setNewMovie((previousMovie)=>{
                return {
                    ...previousMovie,
                    movieUrl:e.target.value
                }
            })
        }}/>
    </Form.Group>

    <Form.Group controlId="moviePosterUrl">
        <Form.Label>Movie Poster Url:</Form.Label>
        <Form.Control type="text" value={newMovie.moviePosterUrl} onChange={(e)=>{
            setNewMovie((previousMovie)=>{
                return {
                    ...previousMovie,
                    moviePosterUrl:e.target.value
                }
            })
        }}/>
    </Form.Group>

    <Form.Group controlId="genre">
        <Form.Label>Genre:</Form.Label>
        <Form.Control type="text" value={newMovie.genre} onChange={(e)=>{
            setNewMovie((previousMovie)=>{
                return {
                    ...previousMovie,
                    genre:e.target.value
                }
            })
        }}/>
    </Form.Group>

    <Form.Group controlId="movieCast">
        <Form.Label>Movie Cast:</Form.Label>
        <Form.Control type="text" value={newMovie.movieCast} onChange={(e)=>{
            setNewMovie((previousMovie)=>{
                return {
                    ...previousMovie,
                    movieCast:e.target.value
                }
            })
        }}/>
    </Form.Group>

    <Button variant="primary" type="submit" onClick={(e)=>handleEdit(e)}>Submit</Button>
</Form>



        </>
    )

}
export default MovieEditComponet