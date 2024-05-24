require("dotenv").config()
const {userModel}=require("../models/models.UserModel")
const jwt=require("jsonwebtoken")

const userVerification = (req, res, next) => {
    console.log(req.header('authorization'),"from middleware")
    const token=req.header("authorization").split(' ')[1]
    if (!token) {
        return res.json({ status: false })
    }
    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
        if (err) {
            return res.json({ status: false })
        } else {
            req.userId=data.id;
            next();
        }
    })
}
module.exports={userVerification}