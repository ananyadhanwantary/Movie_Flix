const movieModel=require("../models/models.movies")
const {userModel} = require("../models/models.UserModel")

async function getLikedMovies(req,res){
    try{
        const movies=await MovieModel.find({})
        var userId=req.query.userId
        var user =await userModel.findById(userId)
        var likedMovies=movies.filter((movie) =>{
            return movie.like.likedUsers.find((u) => u.email == user.email)
        })
        res.status(200).json(likedMovies)
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Error in getting movie details"})
    }
}

async function getMoviesByGenre(req,res){
    try{
        const g=req.params.genre
        
        const movies=await MovieModel.find({})
        const moviearr=[]
        movies.forEach((movie)=> {
            if( movie.genre==g)
            moviearr.push(movie)
        })
        res.status(200).json(moviearr)
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Error in getting movie details"})
    }
}

async function getAllGeneres(req,res){
    const movies=await MovieModel.find({})
    // console.log(movies)
    var genres= new Set()
    movies.forEach( (movie) => {
        genres.add(movie.genre)
    });
    const temp = [...genres]
    // console.log(temp)
    res.status(200).json(temp)
}

async function getAllMovies(req,res){
    try{
        const movies=await movieModel.find({})
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

async function getComments(req,res){
    try{
        const id=(req.params.id)
        const movie=await MovieModel.findById(id)
        if(!movie){
            res.status(404).json({message:"Movie NOT found"})
        }
        else{
            res.status(200).json(movie.comments)
        }

    }
    catch(err){
        console.log(err)
        res.status(500).json("Error in getting all comments")
    }
}

async function getLike(req,res){
    try{
        const movieId=(req.params.id)
        const movie = await MovieModel.findById(movieId);
        if (!movie) {
            console.log('Movie not found');
        }
        var userId=req.query.userId
        console.log(userId)
        var user =await userModel.findById(userId)
        var found = movie.like.likedUsers.find((u) => u.email === user.email)
        if(found)
            res.json({liked : true})
        else
            res.json({liked : false})
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Error in liking movie"})
    }
}

async function addLike(req,res){
    try{
        const movieId=(req.params.id)
        const movie = await MovieModel.findById(movieId);
        if (!movie) {
            console.log('Movie not found');
        }
        var userId=req.body.userId
        // console.log(userId)
        var user =await userModel.findById(userId)
        movie.like.noOfLikes = movie.like.noOfLikes+1
        movie.like.likedUsers.push(user)
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
            var userId=req.body.userId;
            var user =await userModel.findById(userId)
            var ind = movie.like.likedUsers.indexOf(user)
            if(ind)
                movie.like.likedUsers.splice(ind,1)
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
        res.json({ "Likes": movie.like.noOfLikes });
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Error in getting like count"})
    }
}

async function addComment(req,res){
    try{
        const movieId=req.params.id
        const movie=await MovieModel.findById(movieId)
        // console.log(req.body)
        if(!movie){
            res.json({message:"Movie Not found"})
        }
        var userId=req.body.userId;
        const user=await userModel.findById(userId)
        data={comment:req.body.comment,commentedUser:user}
        movie.comments.push(data)
        // console.log(movie.comments)
        const updatedMovie = await MovieModel.findOneAndUpdate({_id:movieId},movie,{new:true});
        res.json(updatedMovie)
    }
    catch(err){
        console.log(err)
        res.json({message:"Error in commenting"})

    }
}


async function search(req,res){
    try{
        const searchQuery=req.query.search||"";
        const movies = await MovieModel.find({ movieName: { $regex: searchQuery, $options: 'i' } });
        res.json(movies)
    }
    catch(err){
        console.log(err)
        res.json({message:"Error occured while searching"})
    }
}

module.exports={getLikedMovies, getAllMovies, getMovie, getComments, getMoviesByGenre, addComment, getLikeCount, removeLike, addLike,getLike, getAllGeneres, search}
