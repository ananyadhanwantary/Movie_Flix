const express=require("express")

const routes=express.Router()

const {getUser}=require("../controllers/controllers.User")


routes.get("/:id",getUser);

module.exports=routes