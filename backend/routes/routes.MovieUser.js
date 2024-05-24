const express=require("express")

const {getAllMovies,getMovie,addLike, removeLike, getLikeCount,addComment,getLike}=require("../controllers/controllers.movieAdmin")
const {userVerification}=require("../middlewares/middlewares.UserMiddleware")

const routes=express.Router()

routes.get("/",getAllMovies)
routes.get("/:id",getMovie)
routes.get("/like/:id",userVerification,getLike)
routes.put("/like/:id",userVerification,addLike)
routes.delete("/like/:id",userVerification,removeLike)
routes.get("/like/:id",getLikeCount)
routes.put("/comment/:id",userVerification,addComment)

module.exports=routes