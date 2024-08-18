const {movieModel} = require("../models/models.movies");

async function addMovie(req, res) {
  try {
    const { movieName, releaseYear, language, genre, movieCast } = req.body;
    const { movieFile, posterFile} = req;
    const movie = new movieModel({
      movieName,
      movieFileName: movieFile,
      moviePosterName: posterFile,
      releaseYear,
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

async function updateMovie(req,res){
    try{
        const id = (req.params.id);
        movie = await MovieModel.findByIdAndUpdate(id,req.body)
        if(!movie){
            res.status(404).json({message:"Movie NOT found"})
        }
        else{
            movie=await MovieModel.findById(id)
            res.status(200).json(movie)
        }
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Error in updating movie details"})
    }
} 

async function deleteMovie(req,res){
    try{
        const id = req.params.id;
        const movie = await MovieModel.findByIdAndDelete(id)
        if(!movie){
            res.status(404).json({message:"Movie NOT found"})
        }
        else{
            res.status(200).json({movie:movie,message:"Movie Deleted successfully"})
        }
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Error in deleting movie details"})
    }
}


module.exports={addMovie, updateMovie, deleteMovie}
