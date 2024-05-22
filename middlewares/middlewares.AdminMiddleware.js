const jwt = require("jsonwebtoken");
require("dotenv").config()
const bcrypt=require("bcryptjs")

const adminVerification = (req, res,next) => {
    try{
        const token = req.cookies.token
    if (!token) {
        return res.json({ status: false })
    }
    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
        if (err) {
        return res.json({ status: false })
        }
        else {
            console.log(data)
            if(data.id.password){
                const email =  process.env.email
                const auth =  bcrypt.compare(data.id.password,process.env.password)
                console.log(data.id.password,process.env.password)
                if (data.id.email==email&& auth){ 
                    next();
                }
                else return res.json({ status: false })
            }
            else{
                return res.json({ status: false })
            }
        }
    })

    }catch(err){
        console.log(err)
    }
}
module.exports={adminVerification}