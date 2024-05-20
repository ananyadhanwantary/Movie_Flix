const mongoose=require("mongoose")
const userModel=require("../models/models.UserModel")

const likeSchema=mongoose.Schema({
    Id:{
        type:Number,
        require:true
    },
    noOfLikes:Number,
    likeduser:{
        type:[userModel]
    }
})
const LikesModel=mongoose.model("Like",likeSchema)
module.exports=LikesModel