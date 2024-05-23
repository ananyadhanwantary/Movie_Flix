const mongoose=require("mongoose")

const {likeSchema}=require("./models.like")
const commentSchema=require("./models.comments")

const moviesSchema=mongoose.Schema({
    movieName:String,
    movieUrl:String,
    moviePosterUrl:String,
    genre: String,
    movieCast:[String],
    like:likeSchema,
    comments:[commentSchema]
})

const MovieModel=mongoose.model("Movie",moviesSchema)
module.exports=MovieModel