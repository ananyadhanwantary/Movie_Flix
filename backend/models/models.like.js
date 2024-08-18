const mongoose=require("mongoose")
const {userSchema}=require("../models/models.UserModel")

const likeSchema=mongoose.Schema({
    noOfLikes:Number,
    likedUsers: [userSchema],
    noOfDislikes:Number,
    dislikedUsers: [userSchema]
})
module.exports={likeSchema}
