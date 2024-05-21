const mongoose=require("mongoose")
const userModel=require("../models/models.UserModel")

const likeModel=mongoose.Schema({
    Id:{
        type:Number,
        require:true
    },
    noOfLikes:Number,
    likeduser:{
        type: mongoose.Schema.Types.ObjectId, ref: 'userModel'
    }
})

const Likesmodel=mongoose.model("Like",likeModel)
module.exports=Likesmodel