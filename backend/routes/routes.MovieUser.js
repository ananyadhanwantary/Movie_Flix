const express=require("express")
const {getLikedMovies, getAllMovies, getMovie, getReviews, getAllLangs, getMoviesByFilter, addReview, getDislikeCount, getLikeCount, removeDislike, removeLike, addDislike, addLike, getLike, getAllGeneres, search, getMovieFile, getPosterFile, addToWatchlist, removeFromWatchlist}=require("../controllers/controllers.MovieUser")

const routes=express.Router()

routes.get("/",getAllMovies)
routes.get("/liked",getLikedMovies)
routes.get("/search",search)
routes.get("/getAllGenres",getAllGeneres)
routes.get("/getAllLangs",getAllLangs)
routes.post("/watchlist/:id",addToWatchlist)
routes.delete("/watchlist/:id",removeFromWatchlist)
routes.get("/:id",getMovie)
routes.get("/like/:id",getLike)
routes.put("/like/:id",addLike)
routes.put("/dislike/:id",addDislike)
routes.delete("/like/:id",removeLike)
routes.delete("/dislike/:id",removeDislike)
routes.get("/likecnt/:id",getLikeCount)
routes.get("/dislikecnt/:id",getDislikeCount)
routes.put("/review/:id",addReview)
routes.get("/reviews/:id",getReviews)
routes.get("/byFilter/:genre/:language",getMoviesByFilter)
routes.get("/movieFile/:filename",getMovieFile)
routes.get("/posterFile/:filename",getPosterFile)



module.exports=routes