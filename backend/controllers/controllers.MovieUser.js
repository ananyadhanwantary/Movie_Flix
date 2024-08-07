const MovieModel=require("../models/models.movies")
const {userModel} = require("../models/models.UserModel")

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
        const id=(req.params.id);
        const movie= await MovieModel.find({_id:id});
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
async function getLikedMovies(req,res){
    try{
        const movies=await MovieModel.find({})
        var userId=req.userId
        var user =await userModel.findById(userId)
        console.log(userId)
        var likedMovies=movies.filter((movie) =>{
            return movie.like.likedUsers.includes(user)
        })
        res.status(200).json(likedMovies)
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Error in getting movie details"})
    }
}

async function addLike(req,res){
    try{
        const movieId=(req.params.id)
        const movie = await MovieModel.findById(movieId);
        if (!movie) {
            console.log('Movie not found');
        }
        var userId=req.userId
        console.log(userId)
        var user =await userModel.findById(userId)
        movie.like.noOfLikes = movie.like.noOfLikes+1
        movie.like.likeduser.push(user)
        const updatedMovie = await MovieModel.findOneAndUpdate({_id:movieId},movie,{new:true});
        res.json(updatedMovie)
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Error in liking movie"})
    }
}

async function removeLike(req,res){
    try{
        const movieId=(req.params.id)
        const movie = await MovieModel.findById(movieId);
        if (!movie) {
            console.log('Movie not found');
        }
        movie.like.noOfLikes = movie.like.noOfLikes-1
        try{
            var userId=req.userId;
            var user =await userModel.findById(userId)
            var ind = movie.like.likeduser.indexOf(user)
            if(ind)
                movie.like.likeduser.splice(ind,1)
        }
        catch(err){
            console.log(err)
            console.log("user not found");
        }
        const updatedMovie = await MovieModel.findOneAndUpdate({_id:movieId},movie,{new:true});
        res.json(updatedMovie)
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Error in disliking movie"})
    }
}

async function getLikeCount(req,res){
    try{
        const movieId=(req.params.id)
        const movie = await MovieModel.findById(movieId);
        if (!movie) {
            console.log('Movie not found');
        }
        res.json({"Likes":movie.like.noOfLikes})
        //res.send(movie.like.noOfLikes)
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Error in getting like count"})
    }
}



async function addComment(req,res){
    try{
        const movieId=parseInt(req.params.id)
        const movie=await MovieModel.findById(movieId)
        if(!movie){
            res.json({message:"Movie Not found"})
        }
        var userId=req.userId;
        const user=await userModel.findById(userId)
        data={comment:req.body.comment,commentedUser:user}
        console.log(movie.comments)
        movie.comments.push(data)
        const updatedMovie = await MovieModel.findOneAndUpdate({_id:movieId},movie,{new:true});
        res.json(updatedMovie)
    }
    catch(err){
        console.log(err)
        res.json({message:"Error in commenting"})

    }
}

module.exports={getAllMovies,getMovie,addLike, removeLike, getLikeCount ,addComment,getLikedMovies }
