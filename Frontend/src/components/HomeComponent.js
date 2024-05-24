// import 'bootstrap/dist/css/bootstrap.min.css';
// import React from 'react';

// function HomeComponent(){
//     return(
//         <>
//             <center>
//                 <h1>Movie-Flix</h1>
//             </center>
//         </>
//     )
// }
// export default HomeComponent;

// import 'bootstrap/dist/css/bootstrap.min.css';
// import React from 'react';

// function HomeComponent() {
//     return (
//         <div className="container">
//         <div className="row">
//             <div className="col">
//             <h1 className="text-center">Movie-Flix</h1>
//             </div>
//         </div>
//         </div>
//     );
// }

// export default HomeComponent;

import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

function HomeComponent() {
    return (
        <div className="container-fluid bg-dark text-light py-5">
        <div className="row">
            <div className="col text-center">
            <h1 className="display-3">Movie-Flix</h1>
            <p className="lead">Your Ultimate Movie Streaming Solution</p>
            <button className="btn btn-primary btn-lg">Explore Now</button>
            </div>
        </div>
        </div>
    );
}

export default HomeComponent;

