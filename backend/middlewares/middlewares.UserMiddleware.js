require("dotenv").config()
const {userModel}=require("../models/models.UserModel")
const jwt=require("jsonwebtoken")

const userVerification = (req, res,next) => {
    // const token = req.cookies.token
    const token=req.header('authorization').split(' ')[1]
    if (!token) {
        return res.json({ status: false })
    }
    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
        if (err) {
        return res.json({ status: false })
        } else {
        //const user = await userModel.findById(data.id)
        //if (user){ 
            req.userId=data.id;
            next();
        //}
        //else return res.json({ status: false })
        }
    })
}
module.exports={userVerification}