const express=require("express")

const routes=express.Router()

const {getAllUser,getUser,deleteUser,userEdit,getOnlineUser}=require("../controllers/controllers.adminUser")
const {adminVerification}=require("../middlewares/middlewares.AdminMiddleware")

//routes.get("/login",checkAdmin)
routes.get("/:id",adminVerification,getUser);
routes.get("/",adminVerification,getAllUser)
routes.delete("/delete/:id",adminVerification,deleteUser)
routes.put("/userEdit/:id",adminVerification,userEdit)
routes.get("/onlineUser",adminVerification,getOnlineUser)

module.exports=routes