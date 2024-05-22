const mongoose=require("mongoose")
const {userSchema}=require("../models/models.UserModel")

const likeSchema=mongoose.Schema({
    _id:{
        type:Number,
        require:true
    },
    noOfLikes:{
        type:Number,
    },
    likeduser: [userSchema]
})
// const LikesModel=mongoose.model("Like",likeSchema)
module.exports={likeSchema}
