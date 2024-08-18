// import axios from "axios";
// import { useState } from "react";
// import { Button, Container, Form } from 'react-bootstrap';
// import { useNavigate } from "react-router-dom";
// function MovieAddComponent(){
//     const navigate = useNavigate()
//         const [movies, setMovies] = useState([])
//         const [newMovie, setNewMovie] = useState({
//             movieName: "",
//             movieUrl: "",
//             moviePosterUrl: "",
//             genre: "",
//             movieCast: []
//         })
//     async function handleAddMovie(e) {
//         e.preventDefault()
//         try{
//             const token = localStorage.getItem("token")
//             var res = await axios.post(`http://localhost:3001/api/admin/movie/`,newMovie,{ headers: {"Authorization" : `Bearer ${token}`} })
//             if(res.data.status===false){
//                 if(res.data.login===false){
//                     alert("please Login to proceed")
//                     navigate("/login")
//                 }
//                 else if(res.data.role==="user"){
//                     alert("You are not authorized to perform ths operation")
//                 }
//             }
//             else{
//                 setMovies([...movies,res.data.movie])
//                 setNewMovie({
//                     movieName:"",
//                     movieUrl:"",
//                     moviePosterUrl:"",
//                     genre: "",
//                     movieCast:[]
//                 })
//                 navigate("/admin/movie")
//             }
//         }
//         catch(err){
//             console.log(err)
//         }
//     }
//     return(
//         <>
//         <br/><br/>
//         <Container className="border border-black">
//             <h1 className="text-center fw-bolder">ADD MOVIE</h1>
//         <Form className="center" style={{ maxWidth: "800px", margin: "auto" }}>
//             <Form.Group controlId="movieName">
//                 <Form.Label>Movie Name:</Form.Label>
//                 <Form.Control
//                     type="text"
//                     placeholder="Enter movie name"
//                     value={newMovie.movieName}
//                     onChange={(e) => setNewMovie((previousMovie) => ({ ...previousMovie, movieName: e.target.value }))}
//                 />
//             </Form.Group>

//             <Form.Group controlId="movieUrl">
//                 <Form.Label>Movie Url:</Form.Label>
//                 <Form.Control
//                     type="text"
//                     placeholder="Enter movie URL"
//                     value={newMovie.movieUrl}
//                     onChange={(e) => setNewMovie((previousMovie) => ({ ...previousMovie, movieUrl: e.target.value }))}
//                 />
//             </Form.Group>

//             <Form.Group controlId="moviePosterUrl">
//                 <Form.Label>Movie Poster Url:</Form.Label>
//                 <Form.Control
//                     type="text"
//                     placeholder="Enter movie poster URL"
//                     value={newMovie.moviePosterUrl}
//                     onChange={(e) => setNewMovie((previousMovie) => ({ ...previousMovie, moviePosterUrl: e.target.value }))}
//                 />
//             </Form.Group>

//             <Form.Group controlId="genre">
//                 <Form.Label>Genre:</Form.Label>
//                 <Form.Control
//                     type="text"
//                     placeholder="Enter genre"
//                     value={newMovie.genre}
//                     onChange={(e) => setNewMovie((previousMovie) => ({ ...previousMovie, genre: e.target.value }))}
//                 />
//             </Form.Group>

//             <Form.Group controlId="movieCast">
//                 <Form.Label>Movie Cast:</Form.Label>
//                 <Form.Control
//                     type="text"
//                     placeholder="Enter movie cast"
//                     value={newMovie.movieCast}
//                     onChange={(e) => setNewMovie((previousMovie) => ({ ...previousMovie, movieCast: e.target.value }))}
//                 />
//             </Form.Group>
            
//             <Button variant="primary" className="my-4" type="submit" onClick={handleAddMovie}>
//                 Submit
//             </Button>
//         </Form>
//         <br/>
//         </Container>
//         <br/><br/>
//         </>
//     )

// }
// export default MovieAddComponent
import React, { useState } from 'react';
import axios from 'axios';

const MovieAddComponent = () => {
  const [movieName, setMovieName] = useState('');
  const [genre, setGenre] = useState('');
  const [movieCast, setMovieCast] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [language, setLanguage] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [posterFile, setPosterFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    if (e.target.name === 'video') {
      setVideoFile(e.target.files[0]);
    } else if (e.target.name === 'poster') {
      setPosterFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!movieName || !genre || !movieCast || !releaseYear || !language || !videoFile || !posterFile) {
      setMessage('All fields are required.');
      return;
    }

    const formData = new FormData();
    formData.append('movieName', movieName);
    formData.append('genre', genre);
    formData.append('movieCast', movieCast);
    formData.append('releaseYear', releaseYear);
    formData.append('language', language);
    formData.append('video', videoFile);
    formData.append('poster', posterFile);

    try {
      const response = await axios.post('http://localhost:5000/movies', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Movie added successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading movie:', error);
      setMessage('Error adding movie. Please try again.');
    }
  };

  return (
    <div>
      <h1>Add New Movie</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Movie Name:</label>
          <input
            type="text"
            value={movieName}
            onChange={(e) => setMovieName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Genre:</label>
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Cast:</label>
          <input
            type="text"
            value={movieCast}
            onChange={(e) => setMovieCast(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Release Year:</label>
          <input
            type="number"
            value={releaseYear}
            onChange={(e) => setReleaseYear(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Language:</label>
          <input
            type="text"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Upload Video:</label>
          <input
            type="file"
            name="video"
            accept="video/*"
            onChange={handleFileChange}
            required
          />
        </div>
        <div>
          <label>Upload Poster:</label>
          <input
            type="file"
            name="poster"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit">Add Movie</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default MovieAddComponent;

