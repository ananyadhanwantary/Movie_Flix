import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"

function MovieEditComponet(){
    const navigate=useNavigate()
    const params=useParams()
    const [movies, setMovies] = useState([])
    const [newMovie,setNewMovie]= useState({
        movieName:"",
        movieUrl:"",
        moviePosterUrl:"",
        genre: "",
        movieCast:[]
    })
    async function handleEdit(e){
        e.preventDefault()
        try{
            const {id}=params
            console.log(id)
            const token = localStorage.getItem("token")
            var res = await axios.put(`http://localhost:3001/api/admin/movie/${id}`,newMovie,{ headers: {"Authorization" : `Bearer ${token}`} })
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
        <form>
        Movie Name:<input type="text" value={newMovie.movieName} onChange={(e)=>{
            setNewMovie((previousMovie)=>{
                return {
                    ...previousMovie,
                    movieName:e.target.value
                }
            })
        }}/>
        <br/>
        <br/>
        Movie Url:<input type="text" value={newMovie.movieUrl} onChange={(e)=>{
            setNewMovie((previousMovie)=>{
                return {
                    ...previousMovie,
                    movieUrl:e.target.value
                }
            })
        }}/>
        <br/>
        <br/>
        Movie Poster Url:<input type="text" value={newMovie.moviePosterUrl} onChange={(e)=>{
            setNewMovie((previousMovie)=>{
                return {
                    ...previousMovie,
                    moviePosterUrl:e.target.value
                }
            })
        }}/>
        <br/>
        <br/>
        Gener <input type="text" value={newMovie.genre} onChange={(e)=>{
            setNewMovie((previousMovie)=>{
                return {
                    ...previousMovie,
                    genre:e.target.value
                }
            })
        }}/>
        <br/>
        <br/>
        Movie Cast:<input type="text" value={newMovie.movieCast} onChange={(e)=>{
            setNewMovie((previousMovie)=>{
                return {
                    ...previousMovie,
                    movieCast:e.target.value
                }
            })
        }}/>
        <br/>
        <br/>
        <input type="submit" onClick={(e)=>handleEdit(e)}/>
    </form>
        </>
    )

}
export default MovieEditComponet