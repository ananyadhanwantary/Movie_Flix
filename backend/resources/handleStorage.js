const multer = require('multer');

// Configure storage for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Check if the file is a movie or a poster and store accordingly
    if (file.fieldname === 'movie') {
      cb(null, __dirname + '/movies'); 
    } else if (file.fieldname === 'poster') {
      cb(null, __dirname + '/posters');
    } else {
      cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE')); // Handle unexpected fields
    }
  },
  filename: (req, file, cb) => {
    const { movieName, releaseYear } = req.body;
    let extArray = file.originalname.split('.');
    let extension = extArray[extArray.length - 1]; // Get the file extension
    let fname = '';

    // Generate filename based on whether it's a movie or poster
    if (file.fieldname === 'movie') {
      fname = `${movieName}-${releaseYear}-movie.${extension}`;
      req.movieFile = fname; // Save the movie filename in the request object
    } else if (file.fieldname === 'poster') {
      fname = `${movieName}-${releaseYear}-poster.${extension}`;
      req.posterFile = fname; // Save the poster filename in the request object
    }

    cb(null, fname); // Pass the generated filename to Multer
  }
});

// Configure Multer to accept all image formats for poster and all video formats for movie
const uploadHandler = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Define MIME type categories
    const isImage = file.mimetype.startsWith('image/');
    const isVideo = file.mimetype.startsWith('video/');

    // Allow any image file for posters and any video file for movies
    if (file.fieldname === 'poster' && isImage) {
      cb(null, true); // Accept any image format
    } else if (file.fieldname === 'movie' && isVideo) {
      cb(null, true); // Accept any video format
    } else {
      cb(new Error(`Unsupported file type for ${file.fieldname}: ${file.mimetype}`)); // Throw error for unsupported types
    }
  }
});

// Handle multiple file uploads
const upload = uploadHandler.fields([
  { name: 'movie', maxCount: 1 },  // Accept only 1 movie file
  { name: 'poster', maxCount: 1 }  // Accept only 1 poster file
]);

// Export the upload function for use in routes
module.exports = { upload };
