const mongoose=require("mongoose")

const likeModel=require("./models.like")

const moviesSchema=mongoose.Schema({
    movieId:{
        type:Number,
        require:true
    },
    movieName:String,
    movieUrl:String,
    moviesPosterUrl:String,
    movieCast:[String],
    like:{
        type:[likeModel]
    }
})

const MovieModel=mongoose.model("Movie",moviesSchemaSchema)
module.exports=MovieModel