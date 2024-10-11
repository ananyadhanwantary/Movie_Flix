const express=require("express")
const {getLikedMovies, getAllMovies, getMovie, getComments, getAllLangs, getMoviesByFilter, addComment, getLikeCount, removeLike, addLike,getLike, getAllGeneres, search, getMovieFile, getPosterFile}=require("../controllers/controllers.MovieUser")

const routes=express.Router()

routes.get("/",getAllMovies)
routes.get("/liked",getLikedMovies)
routes.get("/search",search)
routes.get("/getAllGenres",getAllGeneres)
routes.get("/getAllLangs",getAllLangs)
routes.get("/:id",getMovie)
routes.get("/like/:id",getLike)
routes.put("/like/:id",addLike)
routes.delete("/like/:id",removeLike)
routes.get("/likecnt/:id",getLikeCount)
routes.put("/comment/:id",addComment)
routes.get("/comments/:id",getComments)
routes.get("/byFilter/:genre/:language",getMoviesByFilter)
routes.get("/movieFile/:filename",getMovieFile)
routes.get("/posterFile/:filename",getPosterFile)



module.exports=routes