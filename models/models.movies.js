const mongoose=require("mongoose")

const likeModel=require("./models.like")

const moviesSchema=mongoose.Schema({
    _id:{
        type:Number,
        require:true
    },
    movieName:String,
    movieUrl:String,
    moviePosterUrl:String,
    movieCast:[String],
    like:{
            type: mongoose.Schema.Types.Array,
            ref: 'likeModel'
        }
})

const MovieModel=mongoose.model("Movie",moviesSchema)
module.exports=MovieModel