import axios from 'axios'
import react, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
// import {}


function adminMovieComponent(){
    const navigate = useNavigate()
    const [movies, setMovies] = useState([])
    const [newMovie,setNewMovie]= useState({
        movieName:"",
        movieUrl:"",
        moviePosterUrl:"",
        genre: "",
        movieCast:[]
    })
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
        try{
            var res = await axios.post(`http://localhost:3001/api/admin/movie/${id}`,newMovie,{ headers: {"Authorization" : `Bearer ${token}`} })
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
            }
        }
        catch(err){
            console.log(err)
        }
    }
    async function handleMovieUpdate(id){
        try{
            var res = await axios.put(`http://localhost:3001/api/admin/movie/${id}`,newMovie,{ headers: {"Authorization" : `Bearer ${token}`} })
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
            }
        }
        catch(err){
            console.log(err)
        }
    }
    async function handleUpdateAction(id){
        try{
            var res = await axios.get(`http://localhost:3001/api/admin/movie/${id}`,newMovie,{ headers: {"Authorization" : `Bearer ${token}`} })
            setNewMovie(res.data)
        }
        catch(err){
            console.log(err)
        }
    }
    
    return (
        <>
        </>
    );
}