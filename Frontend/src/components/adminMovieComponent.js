import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { FaPenSquare } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import "../styles/GenreComponent.css";

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
    // const [hovered, setHovered] = useState(null);
    // const cardStyle = (isHovered) => ({
    //     border: 'none',
    //     transition: 'transform 0.2s',
    //     transform: isHovered ? 'translate(5px, -5px)' : 'none',
    //     boxShadow: isHovered ? '0 6px 18px rgb(41, 130, 240)' : 'none'
    //   });
    return (
        <>
        {/* <Container className="d-flex justify-content-center align-items-center mt-4">
            <Row className="justify-content-center">
                <Button onClick={handleMovieInsert}>ADD MOVIE</Button>
                {movies.map((movie) => (
                    <Col lg={4} className="p-3 mb-3" key={movie._id}>
                        <Card 
                  style={cardStyle(hovered === movie._id)} 
                  onMouseEnter={() => setHovered(movie._id)} 
                  onMouseLeave={() => setHovered(null)}
                >
                            <Card.Img variant="top" src={movie.moviePosterUrl} />
                            <Card.Body>
                                <Card.Title>{movie.movieName}</Card.Title>
                                <Card.Text>{movie.movieCast}</Card.Text>
                                <div className='d-flex justify-content-center align-items-center'>
                                <Button variant="primary" className='me-2'>Play Movie</Button>
                                <FaPenSquare className="size-70-px me-2" onClick={() => handleMovieUpdate(movie)} />
                                <MdDelete className='me-2' onClick={() => handleMovieDelete(movie._id)} />
                                </div>                            
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container> */}
        
        <Container className="container-custom mb-4">
            <Row className="custom-row">
                <Button className="mb-4" onClick={handleMovieInsert}>ADD MOVIE</Button>
                {movies.map((movie) => (
                    <Col xs={12} sm={6} md={4} lg={2} className="custom-col custom-col-lg mb-4" key={movie._id}>
                        <Card className='card-custom'>
                            <Card.Img variant="top" src={movie.moviePosterUrl} />
                            <Card.Body className="card-body-custom">
                                <div className="card-content">
                                    <Card.Title className="card-title-custom fs-6">{movie.movieName}</Card.Title>
                                    <Card.Text >{movie.movieCast}</Card.Text>
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