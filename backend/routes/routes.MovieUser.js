const express=require("express")

const {getLikedMovies, getAllMovies,getMovie,addLike, removeLike, getLikeCount,addComment,getLike,getComments,search}=require("../controllers/controllers.movieAdmin")

const routes=express.Router()

routes.get("/",getAllMovies)
routes.get("/liked",getLikedMovies)
routes.get("/search",search)
routes.get("/:id",getMovie)
routes.get("/like/:id",getLike)
routes.put("/like/:id",addLike)
routes.delete("/like/:id",removeLike)
routes.get("/likecnt/:id",getLikeCount)
routes.put("/comment/:id",addComment)
routes.get("/comments/:id",getComments)

module.exports=routes