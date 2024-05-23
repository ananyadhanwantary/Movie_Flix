const express=require("express")

const {addMovie,getAllMovies,getMovie,updateMovie,deleteMovie,getComments,getMoviesByGenre}=require("../controllers/controllers.movieAdmin")
const { getLikeCount } = require("../controllers/controllers.MovieUser")
const {adminVerification}=require("../middlewares/middlewares.AdminMiddleware")

const routes=express.Router()

routes.get("/byGenre",getMoviesByGenre)
routes.get("/:id",adminVerification,getMovie)
routes.put("/:id",adminVerification,updateMovie)
routes.post("/",adminVerification,addMovie)
routes.get("/",adminVerification,getAllMovies)
routes.delete("/:id",adminVerification,deleteMovie)
routes.get("/like/:id",adminVerification,getLikeCount)
routes.get("/comments/:id",adminVerification,getComments)

module.exports=routes