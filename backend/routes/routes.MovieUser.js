const express=require("express")
const {getLikedMovies, getAllMovies, getMovie, getComments, getMoviesByGenre, addComment, getLikeCount, removeLike, addLike,getLike, getAllGeneres, search}=require("../controllers/controllers.movieUser")

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
routes.get("/getAllGenres",getAllGeneres)
routes.get("/byGenre/:genre",getMoviesByGenre)


module.exports=routes