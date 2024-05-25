const express=require("express")

const {getAllMovies,getMovie,addLike, removeLike, getLikeCount,addComment,getLike}=require("../controllers/controllers.movieAdmin")

const routes=express.Router()

routes.get("/",getAllMovies)
routes.get("/:id",getMovie)
routes.get("/like/:id",getLike)
routes.put("/like/:id",addLike)
routes.delete("/like/:id",removeLike)
routes.get("/like/:id",getLikeCount)
routes.put("/comment/:id",addComment)

module.exports=routes