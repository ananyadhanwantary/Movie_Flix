const MovieModel=require("../models/models.movies")

async function addMovie(req,res){
    try{
        const {movieId,movieName,movieUrl,moviesPosterUrl,movieCast}=req.body
        const movie =await MovieModel.create({
            _id:movieId,
            movieName:movieName,
            movieUrl:movieUrl,
            moviePosterUrl:moviesPosterUrl,
            movieCast:movieCast,
            like:{
                _id:movieId,
                noOfLikes:0,
                likedUser:[]
            }
        })
        res.status(200).json(movie)

    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Could not add Movie"})
    }
}

module.exports={addMovie}