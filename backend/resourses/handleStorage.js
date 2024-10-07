const multer = require('multer');
const path = require('path');
const fs = require('fs');

const movies = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(__dirname, 'movies');
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath);
      }
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      // Extract movie name and release year from request body or file metadata
      const { movieName, releaseYear } = req.body;
  
      if (!movieName || !releaseYear) {
        return cb(new Error('Movie name and release year are required'));
      }
  
      // Format filename
      const formattedName = `${movieName}-${releaseYear}${path.extname(file.originalname)}`;
      cb(null, formattedName);
    }
  });


  const posters = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(__dirname, 'posters');
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath);
      }
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      // Extract movie name and release year from request body or file metadata
      const { movieName, releaseYear } = req.body;
  
      if (!movieName || !releaseYear) {
        return cb(new Error('Movie name and release year are required'));
      }
  
      // Format filename
      const formattedName = `${movieName}-${releaseYear}${path.extname(file.originalname)}`;
      cb(null, formattedName);
    }
  });


  const moviesUploader = multer({ movies });
  const postersUploader = multer({ posters });
  
  module.exports = {moviesUploader, postersUploader}