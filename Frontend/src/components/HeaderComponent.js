import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

function HeaderComponent() {
    return (
        <>
        <header className='container d-flex flex-wrap '>
            <div className='text-end'>
                <button className='btn-btn-light text-dark me-2'>Login</button>
                <button className='btn btn-primary'>Sign-up</button> 
            </div>
        </header>
        </>
    );
}

export default HeaderComponent;
