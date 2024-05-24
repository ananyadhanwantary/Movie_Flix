import { useEffect, useState } from 'react';
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faCoffee } from '@fortawesome/free-solid-svg-icons'

import { useParams,useNavigate } from 'react-router-dom';

function SingleMovieComponent(){
    const params=useParams()
    var [movie,setMovie] = useState({})
    var [like,setLike] = useState(false)
    useEffect(()=>{
        const {id} = params
        axios.get(`http://localhost:3001/api/movie/${id}`)
        .then(res=>setMovie(res.data))
        .catch(err => console.log(err))
    })
    function handleLike(id){
        const navigate= useNavigate()
        const token = localStorage.getItem("token")
        axios.get(`http://localhost:3001/api/movie/like/${id}`,{ headers: {Authorization: `Bearer ${token}`}})
            .then(res => {
                if(res.data.status)
                    navigate("/login")
                else
                    setLike(res.data.liked)
            })

        if(!like){
            axios.put(`http://localhost:3001/api/movie/like/${id}`,{ headers: {Authorization: `Bearer ${token}`}})
                .then( res => {
                    if(res.status===200)
                        setLike(true)

                })
                .catch(err => console.log(err)) 
        }
        else{
            axios.delete(`http://localhost:3001/api/movie/like/${id}`,{ headers: {Authorization: `Bearer ${token}`}})
                .then( res => {
                    if(res.status===200)
                        setLike(true)
                })
                .catch(err => console.log(err)) 
        }
    }
    function addComment(id){
        const navigate= useNavigate()
        const token = localStorage.getItem("token")
        axios.put(`http://localhost:3001/api/comment/${id}`,{comment: comment})
            .then(res=>{
                if(res.data.status)
                    navigate("/login")
                else{
                    setMovie(res.data)
                    setComment("")
                }
            })
            .catch(err => console.log(err))
    }
    return (
        <>
        <center>
            <img src={movie.moviePosterUrl}></img>
            <h1>{movie.movieName}</h1>
            <p>{movie.movieCast}</p>
             <FontAwesomeIcon icon="fa-solid fa-heart"  onClick={handleLike}/> 
        </center>
        </>
    )
}
export default SingleMovieComponent
