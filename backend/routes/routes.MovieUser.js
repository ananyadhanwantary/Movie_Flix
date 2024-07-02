const express=require("express")

const {getLikedMovies, getAllMovies,getMovie,addLike, removeLike, getLikeCount,addComment,getLike,getComments}=require("../controllers/controllers.movieAdmin")

const routes=express.Router()

routes.get("/",getAllMovies)
routes.get("/liked",getLikedMovies)
routes.get("/:id",getMovie)
routes.get("/like/:id",getLike)
routes.put("/like/:id",addLike)
routes.delete("/like/:id",removeLike)
routes.get("/like/:id",getLikeCount)
routes.put("/comment/:id",addComment)
routes.get("/comments/:id",getComments)

module.exports=routes