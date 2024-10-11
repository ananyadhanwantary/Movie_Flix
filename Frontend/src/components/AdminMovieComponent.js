import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { FaPenSquare } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import "../styles/GenreComponent.css";
const posterURL = process.env.REACT_APP_posterURL;


function AdminMovieComponent(){
    const navigate = useNavigate()
    const [movies, setMovies] = useState([])
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
        navigate("/addMovie/")
    }
    async function handleMovieUpdate(movie){
        navigate(`/addMovie/${movie._id}`)
        
    }
    return (
        <>        
        <Container className="container-custom mb-4">
            <Row className="custom-row">
                <Button className="mb-4" onClick={handleMovieInsert}>ADD MOVIE</Button>
                {movies.map((movie) => (
                    <Col xs={12} sm={6} md={4} lg={2} className="custom-col custom-col-lg mb-4" key={movie._id}>
                        <Card className='card-custom'>
                            <Card.Img  variant="top" src={`${posterURL}${movie.moviePosterName}`} />
                            <Card.Body className="card-body-custom">
                                <div className="card-content">
                                    <Card.Title className="card-title-custom fs-6">{movie.movieName}</Card.Title>
                                </div>
                                <div className='d-flex flex-column'>
                                    <Button variant="primary" className='mb-2'>Play Movie</Button>
                                    <div className='d-flex justify-content-center justify-content-around align-items-center'>
                                        <div style={{backgroundColor: "#21eb38"}} className='border border-1 border-dark px-3 py-1 d-flex justify-content-center align-items-center' onClick={() => handleMovieUpdate(movie)}><FaPenSquare/></div>
                                        <div style={{backgroundColor: "#f72525"}} className='border border-1 border-dark px-3 py-1 d-flex justify-content-center align-items-center' onClick={() => handleMovieDelete(movie._id)}><MdDelete/></div>
                                    </div> 
                                </div>                           
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
        </>
    );
}
export default AdminMovieComponent