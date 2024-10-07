const express=require("express")

const {addMovie,getAllMovies,getMovie,updateMovie,deleteMovie,getComments,getMoviesByGenre,getAllGeneres}=require("../controllers/controllers.movieAdmin")
const { getLikeCount } = require("../controllers/controllers.MovieUser")
const {moviesUploader, postersUploader} = require("../resourses/handleStorage")

const routes=express.Router()

routes.patch("/:id",updateMovie)
routes.post("/", moviesUploader.single('video'), postersUploader.single('poster'), addMovie)
routes.delete("/:id",deleteMovie)


module.exports=routes