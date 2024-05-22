const express=require("express")

const routes=express.Router()

const {getAllUser,deleteUser,userEdit,checkAdmin}=require("../controller/controller.adminUser")
const {adminVerification}=require("../controller/controller.AdminMiddleware")

routes.get("/login",checkAdmin)
routes.get("/user",adminVerification,getAllUser)
routes.delete("/user/:id",adminVerification,deleteUser)
routes.put("/user/:id",adminVerification,userEdit)

module.exports=routes