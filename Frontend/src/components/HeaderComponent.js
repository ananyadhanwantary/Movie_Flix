import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { IoPersonCircleSharp } from "react-icons/io5";


function HeaderComponent() {
    const {token,logout} = useAuth()
    const navigate = useNavigate()
    function handleLogin(e) {
        e.preventDefault()
        navigate('/login')
    }
    function handleSignup(e) {
        e.preventDefault()
        navigate('/signup')
    }
    function handleProfile(e) {
        e.preventDefault()
        navigate('/profile')
    }
    function handleLogout(e) {
        e.preventDefault()
        logout()
    }
    function handleHome(e) {
        e.preventDefault()
        navigate('/')
    }
    return (
        <>
            <div className='d-flex container-fluid bg-dark fixed-top d-flex align-items-center' style={{ height: "60px" }}>
                <div className='p-2 d-flex align-items-center poetsen-one-regular h1 m-0 text-white '
                    onClick={(e) => { handleHome(e) }}>
                    <i className="bi bi-camera-reels-fill"></i> <span>MovieFlix</span>
                </div>
                <ul className="container-fluid d-inline-flex flex-wrap h5 flex-row-reverse py-2 align-items-center m-0 gap-4" style={{listStyleType: "none", flexGrow:1}}  >
                    <li className="nav-item" >About us</li>
                    <li className="nav-item" onClick={()=> navigate(`/byGenre`, { state: { movieGenre: "All" } })}>Movies</li>
                    <li className="nav-item" onClick={() => navigate("/")}>Home</li>
                </ul>
                <div className='container-fluid d-inline-flex flex-wrap flex-row-reverse py-2 align-items-center m-0 w-auto' style={{minWidth:"fit-content"}}>
                    {token==null ?
                       <div className='float-right px-2'>
                        <button className='btn btn-light me-2' onClick={(e) => { handleLogin(e) }}>Login</button>
                        <button className='btn btn-primary' onClick={(e) => { handleSignup(e) }}>Sign-up</button>
                    </div>
                    :
                    <div className='float-right px-2'>
                        <IoPersonCircleSharp size={30} className="me-2" style={{ color: 'white' }} onClick={(e) => { handleProfile(e) }}/>
                        <button className='btn btn-primary' onClick={(e) => { handleLogout(e) }}>Logout</button>
                    </div>}
                </div>
            </div>
        </>
    );
}

export default HeaderComponent;