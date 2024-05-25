const express=require("express")

const routes=express.Router()

const {getAllUser,getUser,deleteUser,userEdit,getOnlineUser}=require("../controllers/controllers.adminUser")

//routes.get("/login",checkAdmin)
routes.get("/:id",getUser);
routes.get("/",getAllUser)
routes.delete("/delete/:id",deleteUser)
routes.put("/userEdit/:id",userEdit)
routes.get("/onlineUser",getOnlineUser)

module.exports=routes