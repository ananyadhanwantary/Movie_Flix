const mongoose=require("mongoose")
const {userSchema}=require("../models/models.UserModel")

const commentSchema=mongoose.Schema({
    comment:String,
    commentedUser:userSchema
})

module.exports=commentSchema