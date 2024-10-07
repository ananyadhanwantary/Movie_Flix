const mongoose=require("mongoose")

const {likeSchema}=require("./models.like")
const reviewSchema=require("./models.reviews")

const movieSchema=mongoose.Schema({
    movieName:String,
    movieFileName: String,
    moviePosterName: String,
    releaseYear: Number,
    // Duration: Time,
    language: String,
    genre: String,
    movieCast:[String],
    like: likeSchema,
    reviews: [reviewSchema]
})

const MovieModel=mongoose.model("Movie",moviesSchema)
module.exports= {MovieModel,movieSchema}