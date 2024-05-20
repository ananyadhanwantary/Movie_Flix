const mongoose=require("mongoose")

const moviesSchema=mongoose.Schema({
    movieId:{
        type:Number,
        require:true
    },
    movieName:String,
    movieUrl:String,
    moviesPosterUrl:String,
    movieCast:[String],
    //like:likeModel
})

const movieModel=mongoose.model("Movie",moviesSchema)