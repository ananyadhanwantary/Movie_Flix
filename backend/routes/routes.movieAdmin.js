const express=require("express")
const {addMovie,updateMovie,deleteMovie}=require("../controllers/controllers.movieAdmin")
const {upload} = require("../resourses/handleStorage")

const routes=express.Router()

routes.post("/", upload, addMovie)
routes.delete("/:id",deleteMovie)
routes.patch("/:id",updateMovie)
module.exports=routes