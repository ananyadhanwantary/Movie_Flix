const express=require("express")

const {addMovie,getAllMovies,getMovie,updateMovie,deleteMovie}=require("../controller/controller.movieAdmin")

const routes=express.Router()

routes.post("/",addMovie)
routes.get("/",getAllMovies)
routes.get("/:id",getMovie)
routes.put("/:id",updateMovie)
routes.delete("/:id",deleteMovie)

module.exports=routes