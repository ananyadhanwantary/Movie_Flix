import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useNavigate } from "react-router-dom";

function HeaderComponent() {
    const navigate = useNavigate()
    function handleLogin(e) {
        e.preventDefault()
        navigate('/login')
    }
    function handleSignup(e) {
        e.preventDefault()
        navigate('/signup')
    }
    function handleHome(e) {
        
        e.preventDefault()
        navigate('/')
    }
    return (
        <>
            <div className='d-flex container-fluid bg-dark'>
                <div className='col-2 p-2 d-flex align-items-center poetsen-one-regular h1 text-white '
                    onClick={(e) => { handleHome(e) }}>
                    <i className="bi bi-camera-reels-fill"></i> <span>MovieFlix</span>
                </div>
                <div className='container-fluid d-inline-flex flex-wrap flex-row-reverse py-2 align-items-center '>
                    <div className='float-right px-2'>
                        <button className='btn btn-primary me-2' onClick={(e) => { handleLogin(e) }}>Login</button>
                        <button className='btn btn-primary' onClick={(e) => { handleSignup(e) }}>Sign-up</button>
                    </div>
                </div>
            </div>
            <hr className="p-0 m-0" />
        </>
    );
}

export default HeaderComponent;