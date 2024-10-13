const mongoose=require("mongoose")

const reviewSchema=mongoose.Schema({
    review:String,
    rating: Number,
    reviewedUser: String
})

module.exports= reviewSchema