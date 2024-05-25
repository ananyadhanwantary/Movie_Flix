import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
function AdminHomeComponent(){
    const navigate=useNavigate()
    function handleGetMovie(e){
        e.preventDefault()
        navigate("/admin/movie")
    }
    function handleGetUsers(e){
        e.preventDefault()
        navigate("/getUsers")
    }
    return(
        <>
        <div className="container-fluid bg-dark text-light py-5">
        <div className="row">
            <div className="col text-center">
            <h1 className="display-3">Movie-Flix</h1>
            <p className="lead">Your Ultimate Movie Streaming Solution</p>
            <button className="btn btn-primary btn-lg mx-3" onClick={(e)=>handleGetMovie(e)}>Movies</button>
            <button className="btn btn-primary btn-lg mx-3" onClick={(e)=>handleGetUsers(e)}>Users</button>
            </div>
        </div>
        </div>
        </>
    )
}
export default AdminHomeComponent