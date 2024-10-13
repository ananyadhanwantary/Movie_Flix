const express=require("express")

const routes=express.Router()

const {getAllUser,deleteUser,getOnlineUser}=require("../controllers/controllers.adminUser")

routes.get("/",getAllUser)
routes.delete("/delete/:id",deleteUser)
routes.get("/onlineUser",getOnlineUser)

module.exports=routes