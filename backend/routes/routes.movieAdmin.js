const express=require("express")

const {addMovie,getAllMovies,getMovie,updateMovie,deleteMovie,getComments,getMoviesByGenre,getAllGeneres}=require("../controllers/controllers.movieAdmin")
const { getLikeCount } = require("../controllers/controllers.MovieUser")

const routes=express.Router()

<<<<<<< HEAD
routes.get("/byGenre",getMoviesByGenre)
routes.get("/:id",getMovie)
routes.patch("/:id",updateMovie)
routes.post("/",addMovie)
routes.get("/",getAllMovies)
routes.delete("/:id",deleteMovie)
routes.get("/like/:id",getLikeCount)
routes.get("/comments/:id",getComments)
=======
routes.get("/byGenre/:genre",getMoviesByGenre)
routes.get("/getAllGenres",getAllGeneres)
routes.get("/:id",adminVerification,getMovie)
routes.patch("/:id",adminVerification,updateMovie)
routes.post("/",adminVerification,addMovie)
routes.get("/",adminVerification,getAllMovies)
routes.delete("/:id",adminVerification,deleteMovie)
routes.get("/like/:id",adminVerification,getLikeCount)
routes.get("/comments/:id",adminVerification,getComments)
>>>>>>> 4ca837e8aaf5ab1a8d0dcf15be3a4979d9b32c4a

module.exports=routes