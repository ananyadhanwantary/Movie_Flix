// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Container } from "react-bootstrap";
// import { useAuth } from "../providers/AuthProvider";
// function ProfileComponent(){
//     var {userId} = useAuth();
//     var [user,setUser] = useState({})
//     useEffect(()=>{
//         axios.get(`http://localhost:3001/api/user/${userId}`)
//         .then(res => setUser(res.data))
//         .catch(err => console.log(err))
//     },[userId])
//     // const imgPath = "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
//     return(
//         <>
//         <br/><br/>
//            <Container className="vh-100">
//                 {/* <img src={imgPath} className="float-start rounded-circle " /> */}
//                 <h1>{user.username}</h1>
//                 <h1>Email:{user.email}</h1>
//                 <h1>Phone Number:{user.phone}</h1>                
//            </Container>
//            <br/><br/><br/>
//         </>
//     )
// }
// export default ProfileComponent;
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import { IoPersonSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
function ProfileComponent() {
    var navigate = useNavigate()
    const { userId } = useAuth();
    const [user, setUser] = useState({});
    const [likedMovies,setLikedMovies] = useState([]);
    useEffect(() => {
        async function getData(){
        await axios.get(`http://localhost:3001/api/user/${userId}`)
            .then(res => setUser(res.data))
            .catch(err => console.log(err));
        await axios.get(`http://localhost:3001/api/movie/liked`,{params : {userId: userId }})
            .then(res => setLikedMovies(res.data))
            .catch(err => console.log(err));
        }
        getData();
        
    }, []);
    function handleSingleMovie(id) {
        try {
          navigate(`/getMovie/${id}`);
        } catch (err) {
          console.log(err);
        }
      }
      function handleChangePassword(e){
        e.preventDefault()
        navigate('/changePassword')
    }
    return (
        <>
            <Container className="vh-100 d-flex flex-column align-items-center justify-content-center">
                <IoPersonSharp size={200} className="mb-3" />
                <Card className="mx-4" style={{ maxWidth: '500px' }}>
                    {/* <Card.Img variant="top" src={imgPath} className="rounded-circle" /> */}
                    <Card.Body>
                        <Card.Title>{user.username}</Card.Title>
                        <Card.Text>
                            <strong>Email:</strong> {user.email}
                            <br />
                            <strong>Phone Number:</strong> {user.phone}
                        </Card.Text>
                    </Card.Body>
                </Card>
                <button className='btn btn-outline-light me-2 mt-2' onClick={(e) => { handleChangePassword(e) }}>Change Password</button>
            </Container>
            
    <h1 style={{width:"fit-content"}} className="bold  ms-5">My Likedlist</h1>
    <Container className="mt-4">

      <Row>
        <Col sm={10}>
          <Row style={{ width: "fit-content", height: "35rem"}} className="justify-content-center">
            {likedMovies.map((movie) => (
              <Col key={movie._id} className="mb-3">
                <Card style={{ width: "15rem", height: "36rem"}}>
                  <Card.Img variant="top" src={movie.moviePosterUrl} />
                  <Card.Body>
                    <Card.Title>{movie.movieName}</Card.Title>
                    <Card.Text>{movie.movieCast}</Card.Text>
                    <div style={{top:"auto"}} className="">
                    <Button
                      onClick={() => handleSingleMovie(movie._id)}
                      variant="primary"
                    >
                      See More
                    </Button>
                    <Button className="ms-2" variant="secondary" href={movie.movieUrl}/*"https://www.imdb.com/video/vi4219471385/?ref_=tt_vi_i_2"*/>
                      Play Movie
                    </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      <br />
      <br />
      <br />
    </Container>
            {/* <p>{likedMovies[0].movieName}</p> */}
            {/* <button onClick={async ()=>{
                await axios.get(`http://localhost:3001/api/movie/liked`,{params : {userId: userId }})
                .then(res => setLikedMovies(res.data))
                .catch(err => console.log(err));
                console.log(likedMovies[0])}}>click me</button> */}
            <br /><br /><br />
        </>
    );
}

export default ProfileComponent;
