const express=require("express")

const routes=express.Router()

const {getAllUser,getUser,deleteUser,userEdit,getOnlineUser}=require("../controllers/controllers.adminUser")

//routes.get("/login",checkAdmin)
<<<<<<< HEAD
routes.get("/:id",adminVerification,getUser);
routes.get("/",getAllUser)
routes.delete("/delete/:id",deleteUser)
routes.put("/userEdit/:id",adminVerification,userEdit)
routes.get("/onlineUser",adminVerification,getOnlineUser)
=======
routes.get("/:id",getUser);
routes.get("/",getAllUser)
routes.delete("/delete/:id",deleteUser)
routes.put("/userEdit/:id",userEdit)
routes.get("/onlineUser",getOnlineUser)
>>>>>>> 3e819266f1dc447694dc7c7b2c08ce38ba3584fa

module.exports=routes