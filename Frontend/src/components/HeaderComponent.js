import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useNavigate } from "react-router-dom";

function HeaderComponent() {
    const navigate = useNavigate()
    async function handleLogin(e) {
        e.preventDefault()
        try {
            navigate('/login')
        }
        catch(err){
            console.log(err)
        }
    }
    async function handleSignup(e) {
        e.preventDefault()
        try {
            navigate('/signup')
        }
        catch(err){
            console.log(err)
        }
    }
    return (
        <>
            <div className='d-flex container-fluid '>
                <div className='col-2 p-2 d-flex align-items-center justify-content-center poetsen-one-regular h1'>
                    <i class="bi bi-camera-reels-fill"></i> <span>MovieFlix</span>
                </div>
                <div className='container-fluid d-inline-flex flex-wrap flex-row-reverse py-2 align-items-center '>
                    <div className='float-right px-2'>
                        <button className='btn btn-primary me-2' onClick={(e) => handleLogin(e)}>Login</button>
                        <button className='btn btn-primary' onClick={(e) => handleSignup(e)}>Sign-up</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HeaderComponent;
