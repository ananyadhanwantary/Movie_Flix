import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';
<<<<<<< HEAD
//import { faCoffee } from '@fortawesome/free-solid-svg-icons'

import { useNavigate, useParams } from 'react-router-dom';

function SingleMovieComponent(){
    const params=useParams()
    const navigate= useNavigate()
    var [movie,setMovie] = useState({})
    var [like,setLike] = useState(false)
    useEffect(()=>{
        const {id} = params
=======
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AiFillLike } from "react-icons/ai";
//import { faCoffee } from '@fortawesome/free-solid-svg-icons'

import { useParams, useNavigate } from 'react-router-dom';

function SingleMovieComponent() {
    const navigate = useNavigate()
    const params = useParams()
    var [movie, setMovie] = useState({})
    var [like, setLike] = useState(false)
    useEffect(() => {
        const { id } = params
>>>>>>> 20b8677a144f1b5ae344ea17ccbb125f082d1706
        axios.get(`http://localhost:3001/api/movie/${id}`)
            .then(res => setMovie(res.data))
            .catch(err => console.log(err))
    })
<<<<<<< HEAD
    function handleLike(id){
=======
    function handleLike(id) {
>>>>>>> 20b8677a144f1b5ae344ea17ccbb125f082d1706
        const token = localStorage.getItem("token")
        console.log(token)
        if (token) {
            axios.get(`http://localhost:3001/api/movie/like/${id}`, { headers: { Authorization: `Bearer ${token}` } })
                .then(res => {
                    if (res.data.status)
                        navigate("/login")
                    else
                        setLike(res.data.liked)
                })

            if (!like) {
                axios.put(`http://localhost:3001/api/movie/like/${id}`, { headers: { Authorization: `Bearer ${token}` } })
                    .then(res => {
                        if (res.status === 200) {
                            setLike(true)
                            document.getElementById("like_button").style.color = "red"
                        }
                    })
                    .catch(err => console.log(err))
            }
            else {
                axios.delete(`http://localhost:3001/api/movie/like/${id}`, { headers: { Authorization: `Bearer ${token}` } })
                    .then(res => {
                        if (res.status === 200) {
                            setLike(true)
                            document.getElementById("like_button").style.color = "black"
                        }
                    })
                    .catch(err => console.log(err))
            }
        }
        else {
            navigate("/login")
        }
    }
<<<<<<< HEAD
    function addComment(id){
=======
    function addComment(id) {
>>>>>>> 20b8677a144f1b5ae344ea17ccbb125f082d1706
        const token = localStorage.getItem("token")
        axios.put(`http://localhost:3001/api/comment/${id}`,)

    }
    return (
        <>
            <center>
                <img src={movie.moviePosterUrl}></img>
                <h1>{movie.movieName}</h1>
                <p>{movie.movieCast}</p>
                <AiFillLike onClick={handleLike} id="like_button" />
            </center>

        </>
    )
}
export default SingleMovieComponent
