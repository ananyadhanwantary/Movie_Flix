const {movieModel} = require("../models/models.movies");
const fs = require('fs');
const path = require('path');

async function addMovie(req, res) {
  try {
    const { movieName, releaseYear, description, language, genre, movieCast } = req.body;
    const { movieFile, posterFile} = req;
    const movie = new movieModel({
      movieName,
      movieFileName: movieFile,
      moviePosterName: posterFile,
      releaseYear,
      description,
      language,
      movieCast,
      genre,
      like: {
        noOfLikes: 0,
        likedUsers: [],
        noOfDislikes: 0,
        dislikedUsers: []
      },
      reviews: []
    });
    await movie.save();
    res.status(200).json(movie);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error in adding movies" });
  }
}

const updateMovie = async (req, res) => {
  try {
    const id = req.params.id;
    const { movieName, genre, movieCast, releaseYear, description, language } = req.body;
    console.log(releaseYear)
    // Find the movie by ID
    let movie = await movieModel.findById(id);
    if (!movie) {
      return res.status(404).json({ message: "Movie NOT found" });
    }

    // Update movie fields with new data from req.body
    movie.movieName = movieName || movie.movieName;
    movie.genre = genre || movie.genre;
    movie.movieCast = movieCast || movie.movieCast;
    movie.releaseYear = releaseYear || movie.releaseYear;
    movie.description = description || movie.description;
    movie.language = language || movie.language;

    // Check if a video file is uploaded, if yes, update the video
    if (req.file && req.file.fieldname === 'movie') {
      movie.videoFile = req.file.path; // Assuming `path` is the location where multer stores the file
    }

    // Check if a poster file is uploaded, if yes, update the poster
    if (req.file && req.file.fieldname === 'poster') {
      movie.posterFile = req.file.path;
    }

    // Save the updated movie
    const updatedMovie = await movie.save();
    return res.status(200).json(updatedMovie);

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error in updating movie details" });
  }
};


const deleteMovie = async (req, res) => {
  try {
    const id = req.params.id;

    // Find the movie first to get the file paths
    const movie = await movieModel.findById(id);
    if (!movie) {
      return res.status(404).json({ message: "Movie NOT found" });
    }

    // Delete the video file, if it exists
    if (movie.videoFile) {
      const videoPath = path.resolve(movie.videoFile);
      fs.unlink(videoPath, (err) => {
        if (err) {
          console.error(`Error deleting video file: ${err}`);
        } else {
          console.log(`Video file deleted: ${videoPath}`);
        }
      });
    }

    // Delete the poster file, if it exists
    if (movie.posterFile) {
      const posterPath = path.resolve(movie.posterFile);
      fs.unlink(posterPath, (err) => {
        if (err) {
          console.error(`Error deleting poster file: ${err}`);
        } else {
          console.log(`Poster file deleted: ${posterPath}`);
        }
      });
    }

    // Now delete the movie from the database
    await movieModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "Movie Deleted successfully" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error in deleting movie details" });
  }
};


module.exports={addMovie, updateMovie, deleteMovie}
