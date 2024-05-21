const express=require("express")

const {getAllMovies,getMovie,addLike}=require("../controller/controller.MovieUser")

const routes=express.Router()

routes.get("/",getAllMovies)
routes.get("/:id",getMovie)
routes.post("/like/:id",addLike)

module.exports=routes