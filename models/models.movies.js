const mongoose=require("mongoose")

const {likeSchema}=require("./models.like")

const moviesSchema=mongoose.Schema({
    _id:{
        type:Number,
        require:true
    },
    movieName:String,
    movieUrl:String,
    moviePosterUrl:String,
    movieCast:[String],
    like:likeSchema
})

const MovieModel=mongoose.model("Movie",moviesSchema)
module.exports=MovieModel