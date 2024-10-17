const mongoose=require("mongoose")

const {likeSchema}=require("./models.like")
const reviewSchema=require("./models.reviews")

const movieSchema=mongoose.Schema({
    movieName:String,
    movieFileName: String,
    moviePosterName: String,
    releaseYear: Number,
    description: String,
    language: String,
    genre: String,
    movieCast:[String],
    like: likeSchema,
    reviews: [reviewSchema]
})

const movieModel=mongoose.model("Movie",movieSchema)
module.exports= {movieModel}