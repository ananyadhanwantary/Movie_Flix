const express=require("express")
const routes=express.Router()

const {getUser,userEdit}=require("../controllers/controllers.User")
routes.put("/userEdit/:id",userEdit)
routes.get("/:id",getUser);
module.exports=routes