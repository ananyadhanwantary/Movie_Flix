import axios from 'axios';
import { useEffect, useState } from 'react';
import { AiFillLike } from "react-icons/ai";
//import { faCoffee } from '@fortawesome/free-solid-svg-icons'

import { useNavigate, useParams } from 'react-router-dom';

function SingleMovieComponent() {
    const navigate = useNavigate()
    const params = useParams()
    var [movie, setMovie] = useState({})
    var [like, setLike] = useState(false)
    var [comment, setComment] = useState("")
    useEffect(() => {
        const { id } = params
        axios.get(`http://localhost:3001/api/movie/${id}`)
            .then(res => setMovie(res.data))
            .catch(err => console.log(err))
    })
    async function handleLike(id) {
        const token = localStorage.getItem("token")
        console.log(token)
        if (token) {
            var res = await axios.get(`http://localhost:3001/api/movie/like/${id}`,{ headers: {"Authorization" : `Bearer ${token}`} })
            if (res.data.status)
                navigate("/login")
            else {
                console.log(like)
                setLike(res.data.liked)
                console.log(like)
            }
            if (!like) {
                try{
                    res = await axios.put(`http://localhost:3001/api/movie/like/${id}`, { headers: {"Authorization" : `Bearer ${token}`} })
                    if (res.status === 200) {
                        setLike(true)
                        document.getElementById("like_button").style.color = "red"
                    }
                }
                catch(err){
                    console.log(err)
                }
            }
            else {
                try{
                    res = await axios.delete(`http://localhost:3001/api/movie/like/${id}`, { headers: {"Authorization" : `Bearer ${token}`} })
                    if (res.status === 200) {
                        setLike(true)
                        document.getElementById("like_button").style.color = "black"
                        console.log('hello else')
                    }
                }
                catch(err){
                    console.log(err)
                }
            }
        }
        else {
            alert("User not Logged In Please Login")
            navigate("/login")
        }
    }
    function addComment(id) {
        const token = localStorage.getItem("token")
        axios.put(`http://localhost:3001/api/comment/${id}`, { comment: comment })
            .then(res => {
                if (res.data.status)
                    navigate("/login")
                else {
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
                {/* <FontAwesomeIcon icon="fa-solid fa-heart"  onClick={handleLike}/>  */}
                <AiFillLike onClick={() => handleLike(movie._id)} id="like_button" />
            </center>

        </>
    )
}
export default SingleMovieComponent
