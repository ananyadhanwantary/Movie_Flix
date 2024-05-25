const jwt = require("jsonwebtoken");
const {userModel} = require("../models/models.UserModel")
require("dotenv").config()
const bcrypt=require("bcryptjs")

const adminVerification = (req, res,next) => {
    try{
        //const token = req.cookies.token
        const token=req.headers['authorization'].split(' ')[1]
        if (!token) {
            return res.json({ message :"No token",status: false ,login:false})
        }
        jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
            if (err){
                return res.json({ message:"Error occurred", status: false ,login:false})
            }
            // const admin=await userModel.findById(data.id)
            // if(admin.role=="admin"){
                next();
            //}
            // else{
            //     return res.json({ status: false, role: "user"})
            // }
        })
    }catch(err){
        console.log(err)
    }
}
module.exports={adminVerification}