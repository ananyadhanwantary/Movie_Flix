const MovieModel=require("../models/models.movies")

async function addMovie(req,res){
    try{
        const{movieName, movieUrl,moviePosterUrl,movieCast}=req.body

        const movie=await MovieModel.create({
            movieName:movieName, 
            movieUrl:movieUrl,
            moviePosterUrl:moviePosterUrl,
            movieCast:movieCast,
            like:{
                noOfLikes:0,
                likedUsers:[]
            },
            comments:[]
        })
        res.status(200).json(movie)
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Error in adding movies"})
    }
}

async function getAllMovies(req,res){
    try{
        const movies=await MovieModel.find({})
        res.status(200).json(movies)
    }
    catch(err){
        res.status(500).json({message:"Error in getting movie details"})
    }
}

async function getMovie(req,res){
    try{
        const {id}=req.params;
        const movie= await MovieModel.findById(id);
        if(!movie){
            res.status(404).json({message:"Movie NOT found"})
        }
        else res.status(200).json(movie);
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Error in getting movie details"})
    }
}

async function updateMovie(req,res){
    try{
        const id = (req.params.id);
        movie = await MovieModel.findByIdAndUpdate(id,req.body)
        if(!movie){
            res.status(404).json({message:"Movie NOT found"})
        }
        else{
            movie=await MovieModel.findById(id)
            res.status(200).json(movie)
        }
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Error in updating movie details"})
    }
} 

async function deleteMovie(req,res){
    try{
        const id = req.params.id;
        const movie = await MovieModel.findByIdAndDelete(id)
        if(!movie){
            res.status(404).json({message:"Movie NOT found"})
        }
        else{
            res.status(200).json({message:"Movie Deleted successfully"})
        }
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Error in deleting movie details"})
    }
}

async function getComments(req,res){
    try{
        const id=parseInt(req.params.id)
        const movie=await MovieModel.findById(id)
        if(!movie){
            res.status(404).json({message:"Movie NOT found"})
        }
        else{
            res.status(200).json(movie.comments)
        }

    }
    catch(err){
        res.status(500).json("Error in getting all comments")
    }
}
module.exports={addMovie,getAllMovies,getMovie,updateMovie,deleteMovie,getComments}