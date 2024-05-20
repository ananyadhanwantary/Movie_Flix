const mongoose=require("mongoose")
const userModel=require("../models/models.UserModel")

const likeSchema=mongoose.Schema({
    _id:{
        type:Number,
        require:true
    },
    noOfLikes:Number,
    likeduser:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel'
    }]
})
const LikesModel=mongoose.model("Like",likeSchema)
module.exports=LikesModel