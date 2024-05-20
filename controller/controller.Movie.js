const MovieModel=require("../models/models.movies")
async function getAllMovies(req,res){
    try{
        const movies=await MovieModel.find({})
        res.status(200).json(users)
    }
    catch(err){
        res.status(500).json({message:"Error in getting movie details"})
    }
}
async function getMovie(req,res){
    try{
        const {id}=req.params;
        const movie=MovieModel.find(id);
        if(!movie){
            res.status(404).json({message:"Movie NOT found"})
        }
        else res.status(200).json(movie);
    }
    catch(err){
        res.status(500).json({message:"Error in getting movie details"})
    }
}
module.exports={getAllMovies,getMovie}