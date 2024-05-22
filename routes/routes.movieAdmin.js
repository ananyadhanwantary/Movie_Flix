const express=require("express")

const {addMovie,getAllMovies,getMovie,updateMovie,deleteMovie}=require("../controllers/controllers.movieAdmin")
const { getLikeCount } = require("../controllers/controllers.MovieUser")
const {adminVerification}=require("../middlewares/middlewares.AdminMiddleware")

const routes=express.Router()

routes.post("/",adminVerification,addMovie)
routes.get("/",adminVerification,getAllMovies)
routes.get("/:id",adminVerification,getMovie)
routes.put("/:id",adminVerification,updateMovie)
routes.delete("/:id",adminVerification,deleteMovie)
routes.get("/like/:id",adminVerification,getLikeCount)

module.exports=routes