import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { AiFillLike } from "react-icons/ai";
import { useAuth } from "../providers/AuthProvider"
//import { faCoffee } from '@fortawesome/free-solid-svg-icons'

import { useNavigate, useParams } from 'react-router-dom';

function SingleMovieComponent() {
    const navigate = useNavigate()
    const params = useParams()
    var {userId} = useAuth()
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
        // console.log(token)
        if (token) {
            var res = await axios.get(`http://localhost:3001/api/movie/like/${id}`,{userId : userId}, { headers: { "Authorization": `Bearer ${token}` } })
            if (res.data.status)
                navigate("/login")
            else {
                setLike(res.data.liked)
            }
            if (!like) {
                try {
                    // console.log(token," from try in if")
                    res = await axios.put(`http://localhost:3001/api/movie/like/${id}`, {userId : userId}, { headers: { "Authorization": `Bearer ${token}` } })
                    if (res.status === 200) {
                        setLike(true)
                        document.getElementById("like_button").style.color = "red"
                    }
                }
                catch (err) {
                    console.log(err)
                }
            }
            else {
                try {
                    res = await axios.delete(`http://localhost:3001/api/movie/like/${id}`,{userId : userId}, { headers: { "Authorization": `Bearer ${token}` } })
                    if (res.status === 200) {
                        setLike(false)
                        document.getElementById("like_button").style.color = "black"
                    }
                }
                catch (err) {
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
        axios.put(`http://localhost:3001/api/movie/comment/${id}`, { comment: comment , userId : userId}, { headers: { "Authorization": `Bearer ${token}` } })
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
            {/* <center>
                <img src={movie.moviePosterUrl}></img>
                <h1>{movie.movieName}</h1>
                <p>{movie.movieCast}</p>
                <AiFillLike onClick={() => handleLike(movie._id)} id="like_button" />
                Comment:<input type="text" value={comment} onChange={(e) => setComment(e.target.value)}></input>
                <button type="submit" onClick={() => addComment(movie._id)}>submit Comment</button>
            </center> */}
            <Container>
                <Row className="justify-content-center">
                    <Col xs={12} md={6}>
                        <img src={movie.moviePosterUrl} alt="Movie Poster" className="img-fluid" />
                        <h1>{movie.movieName}</h1>
                        <p>{movie.movieCast}</p>
                        <AiFillLike onClick={() => handleLike(movie._id)} id="like_button" />
                        <Form.Group controlId="comment">
                            <Form.Label>Comment:</Form.Label>
                            <Form.Control type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
                        </Form.Group>
                        <Button variant="primary" onClick={() => addComment(movie._id)}>Submit Comment</Button>
                    </Col>
                </Row>
            </Container>




        </>
    )
}
export default SingleMovieComponent
