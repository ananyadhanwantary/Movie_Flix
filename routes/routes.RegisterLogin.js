const express=require("express")

const {saveUser,checkUser}=require("../controller/controller.RegisterLogin")

const routes=express.Router()

routes.post("/signup",saveUser)
routes.get("/Login",checkUser)

module.exports=routes