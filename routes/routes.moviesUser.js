const express=require("express")

const {getAllMovies,getMovie,addLike, removeLike}=require("../controller/controller.MovieUser")

const routes=express.Router()

routes.get("/",getAllMovies)
routes.get("/:id",getMovie)
routes.put("/like/:id",addLike)
routes.delete("/like/:id",removeLike)

module.exports=routes