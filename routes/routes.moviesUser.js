const express=require("express")

const {getAllMovies,getMovie,addLike}=require("../controller/controller.Movie")

const routes=express.Router()

routes.get("/movie",getAllMovies)
routes.get("/movie/:id",getMovie)
routes.post("/like/:id",addLike)

module.exports=routes