import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Alert, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom'; // Import useParams to get the ID from the URL

const MovieAddComponent = () => {
  const [movieName, setMovieName] = useState('');
  const [genre, setGenre] = useState('');
  const [movieCast, setMovieCast] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [language, setLanguage] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [posterFile, setPosterFile] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { id } = useParams(); // Get the movie ID from the URL if it exists

  // Fetch movie details if we are editing an existing movie
  useEffect(() => {
    if (id) {
      // If `id` is present, fetch movie data
      axios.get(`http://localhost:3001/api/movie/${id}`)
        .then((response) => {
          const movie = response.data;
          setMovieName(movie.movieName);
          setGenre(movie.genre);
          setMovieCast(movie.movieCast);
          setReleaseYear(movie.releaseYear);
          setLanguage(movie.language);
          setDescription(movie.description);
        })
        .catch((error) => {
          setMessage('Error fetching movie data. Please try again.');
          console.error(error);
        });
    }
  }, [id]);

  const handleFileChange = (e) => {
    if (e.target.name === 'movie') {
      setVideoFile(e.target.files[0]);
    } else if (e.target.name === 'poster') {
      setPosterFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!movieName || !genre || !movieCast || !releaseYear || !language || (!videoFile && !id) || (!posterFile && !id)) {
      setMessage('All fields are required.');
      return;
    }

    const formData = new FormData();
    formData.append('movieName', movieName);
    formData.append('genre', genre);
    formData.append('movieCast', movieCast);
    formData.append('releaseYear', releaseYear);
    formData.append('description', description);
    formData.append('language', language);
    if (videoFile) formData.append('movie', videoFile); // Append only if a new video file is selected
    if (posterFile) formData.append('poster', posterFile); // Append only if a new poster file is selected

    try {
      setLoading(true);
      let response;
      
      if (id) {
        // If there's an `id`, update the existing movie
        response = await axios.put(`http://localhost:3001/api/admin/movie/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setMessage('Movie updated successfully!');
      } else {
        // If no `id`, add a new movie
        response = await axios.post('http://localhost:3001/api/admin/movie', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setMessage('Movie added successfully!');
      }

      setLoading(false);
      
      // Clear form inputs after success
      setMovieName('');
      setGenre('');
      setMovieCast('');
      setReleaseYear('');
      setLanguage('');
      setDescription('');
      setVideoFile(null);
      setPosterFile(null);

      console.log(response.data);
    } catch (error) {
      console.error('Error uploading movie:', error);
      setMessage('Error adding/updating movie. Please try again.');
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5 w-50">
      <h1 className="text-center mb-4">{id ? 'Edit Movie' : 'Add New Movie'}</h1>
      {message && <Alert variant={message.includes('successfully') ? 'success' : 'danger'}>{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="movieName">
          <Form.Label>Movie Name</Form.Label>
          <Form.Control
            type="text"
            value={movieName}
            onChange={(e) => setMovieName(e.target.value)}
            required
            placeholder="Enter movie name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="genre">
          <Form.Label>Genre</Form.Label>
          <Form.Control
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
            placeholder="Enter genre"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="movieCast">
          <Form.Label>Cast</Form.Label>
          <Form.Control
            type="text"
            value={movieCast}
            onChange={(e) => setMovieCast(e.target.value)}
            required
            placeholder="Enter movie cast"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="releaseYear">
          <Form.Label>Release Year</Form.Label>
          <Form.Control
            type="number"
            value={releaseYear}
            onChange={(e) => setReleaseYear(e.target.value)}
            required
            placeholder="Enter release year"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Enter movie description"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="language">
          <Form.Label>Language</Form.Label>
          <Form.Control
            type="text"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            required
            placeholder="Enter language"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="videoFile">
          <Form.Label>Upload Video</Form.Label>
          <Form.Control
            type="file"
            name="movie"
            accept="video/*"
            onChange={handleFileChange}
          />
          {id && !videoFile && <p>Current video file will be retained if no new file is selected.</p>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="posterFile">
          <Form.Label>Upload Poster</Form.Label>
          <Form.Control
            type="file"
            name="poster"
            accept="image/*"
            onChange={handleFileChange}
          />
          {id && !posterFile && <p>Current poster will be retained if no new file is selected.</p>}
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : id ? 'Update Movie' : 'Add Movie'}
        </Button>
      </Form>
    </Container>
  );
};

export default MovieAddComponent;
