const express=require("express")

const {addMovie,getAllMovies,getMovie,updateMovie,deleteMovie}=require("../controller/controller.movieAdmin")
const { getLikeCount } = require("../controller/controller.MovieUser")

const routes=express.Router()

routes.post("/",addMovie)
routes.get("/",getAllMovies)
routes.get("/:id",getMovie)
routes.put("/:id",updateMovie)
routes.delete("/:id",deleteMovie)
routes.get("/like/:id",getLikeCount)

module.exports=routes