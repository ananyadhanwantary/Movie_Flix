const express=require("express")

const {getAllMovies,getMovie}=require("../controller/controller.Movie")

const routes=express.Router()

routes.get("/getAllMovies",getAllMovies)
routes.get("getMovie/:id",getMovie)

module.exports=routes