const express=require("express")

const {getAllMovies,getMovie,addLike, removeLike, getLikeCount,userVerification}=require("../controller/controller.MovieUser")

const routes=express.Router()

routes.get("/",getAllMovies)
routes.get("/:id",getMovie)
routes.put("/like/:id",userVerification,addLike)
routes.delete("/like/:id",removeLike)
routes.get("/like/:id",getLikeCount)

module.exports=routes