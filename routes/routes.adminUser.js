const express=require("express")

const routes=express.Router()

const {getAllUser,getUser,deleteUser,userEdit,checkAdmin,getOnlineUser}=require("../controllers/controllers.adminUser")
const {adminVerification}=require("../middlewares/middlewares.AdminMiddleware")

routes.get("/login",checkAdmin)
routes.get("/user/:id",adminVerification,getUser);
routes.get("/user",adminVerification,getAllUser)
routes.delete("/user/:id",adminVerification,deleteUser)
routes.put("/user/:id",adminVerification,userEdit)
routes.get("/user/online",adminVerification,getOnlineUser)

module.exports=routes