const express=require("express")

const {getAllMovies}=require("../controller/controller.moviesUser")

const routes=express.Router()

routes.get("/getAllMovies",getAllMovies)

module.exports=routes