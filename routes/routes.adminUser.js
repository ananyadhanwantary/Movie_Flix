const express=require("express")

const routes=express.Router()

const {getAllUser,deleteUser,userEdit}=require("../controller/controller.adminUser")

routes.get("/user",getAllUser)
routes.delete("/user/:id",deleteUser)
routes.put("/user/:id",userEdit)

module.exports=routes