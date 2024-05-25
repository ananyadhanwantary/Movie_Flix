require("dotenv").config()
const {userModel}=require("../models/models.UserModel")
const jwt=require("jsonwebtoken")

const userVerification = (req, res, next) => {
    console.log(req.method, req.url, req.header('authorization'),"from middleware")
    const token=req.header("authorization").split(' ')[1]
    if (!token) {
        return res.json({message :"No token", status: false })
    }
    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
        if (err) {
            return res.json({message:"Error occurred", status: false })
        } 
        // else {
            // req.userId=data.id;
            next();
        // }
    })
}
module.exports={userVerification}