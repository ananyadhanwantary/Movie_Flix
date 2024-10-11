const path = require("path")
const {movieModel}=require("../models/models.movies")
const {userModel} = require("../models/models.UserModel")

async function getMovieFile(req,res){
    try{
        const fileName = req.params.filename;
        const videoPath = path.join(__dirname,'../resources/movies/',fileName);
        res.sendFile(videoPath);
    }
    catch(err){
        console.log(err);
        res.status(404).json({message: "Movie File Doesn't exist"});
    }
}
async function getPosterFile(req,res){
    try{
        const fileName = req.params.filename;
        const posterPath = path.join(__dirname,'../resources/posters/',fileName);
        res.sendFile(posterPath);
    }
    catch(err){
        console.log(err);
        res.status(404).json({message: "Poster File Doesn't exist"});
    }
}

async function getLikedMovies(req,res){
    try{
        const movies=await movieModel.find({})
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

async function getMoviesByFilter(req,res){
    try{
        var movies;
        const g = req.params.genre
        const l = req.params.language
        if(g === 'All' && l === 'All'){
            movies=await movieModel.find({})
        }
        else if( l === 'All'){
            movies = await movieModel.find({ genre: { $regex: new RegExp(g, "i") } });
        }
        else if( g === 'All'){
            movies = await movieModel.find({ language: { $regex: new RegExp(l, "i") } });
        }
        else{
            movies = await movieModel.find({
                genre: { $regex: new RegExp(g, "i") },
                language: { $regex: new RegExp(l, "i") }
              });
        }
        res.status(200).json(movies)
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Error in getting movie details"})
    }
}

async function getAllGeneres(req,res){
    const uniqueGenres = await movieModel.distinct('genre');
    res.status(200).json(uniqueGenres)
}

async function getAllLangs(req,res){
    const uniqueLanguages = await movieModel.distinct('language');
    res.status(200).json(uniqueLanguages)
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
        const movie= await movieModel.findById(id);
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
        const movie=await movieModel.findById(id)
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
    const movieId = req.params.id;
    const userId = req.query.userId;
    try {
        const movie = await movieModel.findById(movieId);
        if (!movie) {
            console.log('Movie not found');
            return res.status(404).json({ message: 'Movie not found' });
        }
        
        const user = await userModel.findById(userId);
        if (!user) {
            console.log('user not found',userId);
            return res.status(404).json({ message: `${userId}  user not found` });
        }
        const found = movie.like.likedUsers.some((u) => u.email === user.email);
        res.json({ liked: found })
    } 
    catch (error) {
        console.error(error)
        res.status(500).json({ message: 'An error occurred' })
    }

}

async function addLike(req,res){
    try{
        const movieId=(req.params.id)
        const movie = await movieModel.findById(movieId);
        if (!movie) {
            console.log('Movie not found');
        }
        var userId=req.body.userId
        // console.log(userId)
        var user =await userModel.findById(userId)
        movie.like.noOfLikes = movie.like.noOfLikes+1
        movie.like.likedUsers.push(user)
        const updatedMovie = await movieModel.findOneAndUpdate({_id:movieId},movie,{new:true});
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
        const movie = await movieModel.findById(movieId);
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
        const updatedMovie = await movieModel.findOneAndUpdate({_id:movieId},movie,{new:true});
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
        const movie = await movieModel.findById(movieId);
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
        const movie=await movieModel.findById(movieId)
        // console.log(req.body)
        if(!movie){
            res.json({message:"Movie Not found"})
        }
        var userId=req.body.userId;
        const user=await userModel.findById(userId)
        data={comment:req.body.comment,commentedUser:user}
        movie.comments.push(data)
        // console.log(movie.comments)
        const updatedMovie = await movieModel.findOneAndUpdate({_id:movieId},movie,{new:true});
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
        const movies = await movieModel.find({ movieName: { $regex: searchQuery, $options: 'i' } });
        res.json(movies)
    }
    catch(err){
        console.log(err)
        res.json({message:"Error occured while searching"})
    }
}

module.exports={getLikedMovies, getAllMovies, getMovie, getComments, getAllLangs, getMoviesByFilter, addComment, getLikeCount, removeLike, addLike,getLike, getAllGeneres, search, getMovieFile, getPosterFile}
