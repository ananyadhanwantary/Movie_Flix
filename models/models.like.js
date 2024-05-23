const mongoose=require("mongoose")
const {userSchema}=require("../models/models.UserModel")

const likeSchema=mongoose.Schema({
    noOfLikes:{
        type:Number,
    },
    likedUsers: [userSchema]
})
// const LikesModel=mongoose.model("Like",likeSchema)
module.exports={likeSchema}
