const express=require("express")

const routes=express.Router()

const {getAllUser,deleteUser,userEdit}=require("../controller/controller.adminUser")

routes.get("/",getAllUser)
routes.delete("/delete/:id",deleteUser)
routes.put("/userEdit/:id",userEdit)

module.exports=routes