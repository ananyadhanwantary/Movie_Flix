const express=require("express")

const routes=express.Router()
const {getAllMovies,getMovie,updateMovie,deleteMovie}=require("../controller/controller.Movie")

const {getAllUser,deleteUser,userEdit}=require("../controller/controller.adminUser")

routes.get("/",getAllUser)
routes.delete("/delete/:id",deleteUser)
routes.put("/userEdit/:id",userEdit)


routes.put("/movie/:id", updateMovie)
routes.get("/movies",getAllMovies)
routes.get("/movie/:id",getMovie)
routes.delete("/movie/:id",deleteMovie)

module.exports=routes