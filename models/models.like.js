const mongoose=require("mongoose")
const {RegisterModel,RegisterSchema}=require("../models/models.UserModel")

const likeSchema=mongoose.Schema({
    _id:{
        type:Number,
        require:true
    },
    noOfLikes:{
        type:Number,
    },
    likeduser: [RegisterSchema]
})
// const LikesModel=mongoose.model("Like",likeSchema)
module.exports={likeSchema}
