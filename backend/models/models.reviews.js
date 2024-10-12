const mongoose=require("mongoose")
const {userSchema}=require("./models.UserModel")

const reviewSchema=mongoose.Schema({
    review:String,
    rating: Number,
    reviewedUser: userSchema
})

module.exports= reviewSchema