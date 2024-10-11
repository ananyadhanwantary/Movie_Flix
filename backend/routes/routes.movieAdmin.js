const express=require("express")
const {addMovie,updateMovie,deleteMovie}=require("../controllers/controllers.movieAdmin")
const {upload} = require("../resources/handleStorage")

const routes=express.Router()

routes.post("/", upload, addMovie)
routes.delete("/:id",deleteMovie)
routes.put("/:id", upload,updateMovie)
module.exports=routes