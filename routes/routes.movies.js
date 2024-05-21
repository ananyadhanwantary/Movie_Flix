const express=require("express")

const {addMovie}=require("../controller/controller.Movie")

const routes=express.Router()

routes.post("/addMovie",addMovie)

module.exports=routes