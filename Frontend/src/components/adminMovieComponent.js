import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FaPenSquare } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
// import {}


function AdminMovieComponent(){
    const navigate = useNavigate()
    const [movies, setMovies] = useState([])
    // const [newMovie,setNewMovie]= useState({
    //     movieName:"",
    //     movieUrl:"",
    //     moviePosterUrl:"",
    //     genre: "",
    //     movieCast:[]
    // })
    useEffect(() => {
        try {
            axios.get("http://localhost:3001/api/movie/")
                .then(response => setMovies(response.data))
        }
        catch (err) {
            console.log(err)
        }

    }, [movies])
    
    async function handleMovieDelete(id){
        try{
            const token = localStorage.getItem("token")
            var res = await axios.delete(`http://localhost:3001/api/admin/movie/${id}`,{ headers: {"Authorization" : `Bearer ${token}`} })
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
                var ind = movies.indexOf(res.data.movie)
                setMovies(movies.splice(ind,1))
                console.log(res.data)
            }
        }
        catch(err){
            console.log(err)
            
        }
    }

    async function handleMovieInsert(){
        navigate("/addMovie")
    }
    async function handleMovieUpdate(movie){
        navigate(`/editMovie/${movie._id}`)
        
    }
    // async function handleUpdateAction(id){
    //     try{
    //         const token = localStorage.getItem("token")
    //         var res = await axios.get(`http://localhost:3001/api/admin/movie/${id}`,newMovie,{ headers: {"Authorization" : `Bearer ${token}`} })
    //         setNewMovie(res.data)
    //     }
    //     catch(err){
    //         console.log(err)
    //     }
    // }
    
    return (
        <>
        <div className="container d-flex justify-content-center align-content-center">
            <div className="row justify-content-center">
                <Button onClick={()=>handleMovieInsert()}>ADD MOVIE</Button>
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
                                <FaPenSquare className="size-70-px"onClick={()=>handleMovieUpdate(movie)}/><MdDelete onClick={()=>handleMovieDelete(movie._id)}/>
                            </Card.Body>
                        </Card>
                    </div>
                )}
            </div>
        </div>
        </>
    );
}
export default AdminMovieComponent