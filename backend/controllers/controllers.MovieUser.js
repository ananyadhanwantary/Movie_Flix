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
        const movies=await movieModel.find({}).sort({ releaseYear: -1 });
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
            movies=await movieModel.find({}).sort({ releaseYear: -1 });
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
        const movies=await movieModel.find({}).sort({ releaseYear: -1 });
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

async function getReviews(req,res){
    try{
        const id=(req.params.id)
        const movie=await movieModel.findById(id)
        if(!movie){
            res.status(404).json({message:"Movie NOT found"})
        }
        else{
            res.status(200).json(movie.Reviews)
        }

    }
    catch(err){
        console.log(err)
        res.status(500).json("Error in getting all Reviews")
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
        console.log(userId)
        const liked = movie.like.likedUsers.some((u) => u.email === user.email);
        const disliked = movie.like.dislikedUsers.some((u) => u.email === user.email);
        res.json({ liked: liked, disliked: disliked })
        
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

async function addDislike(req,res){
    try{
        const movieId=(req.params.id)
        const movie = await movieModel.findById(movieId);
        if (!movie) {
            console.log('Movie not found');
        }
        var userId=req.body.userId
        var user =await userModel.findById(userId)
        movie.like.noOfDislikes = movie.like.noOfDislikes+1
        movie.like.dislikedUsers.push(user)
        const updatedMovie = await movieModel.findOneAndUpdate({_id:movieId},movie,{new:true});
        res.json(updatedMovie)
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Error in liking movie"})
    }
}

async function removeDislike(req,res){
    try{
        const movieId=(req.params.id)
        const movie = await movieModel.findById(movieId);
        if (!movie) {
            console.log('Movie not found');
        }
        movie.like.noOfDislikes = movie.like.noOfDislikes-1
        try{
            var userId=req.body.userId;
            var user =await userModel.findById(userId)
            var ind = movie.like.dislikedUsers.indexOf(user)
            if(ind)
                movie.like.dislikedUsers.splice(ind,1)
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
        const cnt = await movieModel.findOne({ _id: movieId }, { "like.noOfLikes": 1, _id: 0 })
        if (!cnt) {
            console.log('Movie not found');
        }
        res.json({ "Likes": cnt.like.noOfLikes });
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Error in getting like count"})
    }
}

async function getDislikeCount(req,res){
    try{
        const movieId=(req.params.id)
        const cnt = await movieModel.findOne({ _id: movieId }, { "like.noOfDislikes": 1, _id: 0 })
        if (!cnt) {
            console.log('Movie not found');
        }
        res.json({ "Dislikes": cnt.like.noOfDislikes });
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Error in getting like count"})
    }
}

async function addReview(req,res){
    const { rating, review, userId } = req.body;
    try {
      const movie = await movieModel.findById(req.params.id);
      const user = await userModel.findById(userId)
      movie.reviews.splice(0,0,{ reviewedUser:user.username, rating, review });
      await movie.save();
      res.status(200).send('Review added successfully');
    } catch (err) {
        console.log(err)
      res.status(500).send('Error submitting review');
    }
};
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

async function addToWatchlist(req,res){
    const movieId = req.params.id;
    const userId = req.body.userId;

    try{
        let user = await userModel.findById(userId)
        if(user){
            if (!user.watchlist.includes(movieId)) {
                user.watchlist.splice(0,0,movieId);
                user =await user.save()
            }
            res.status(200).json({user: user})
            console.log(user)
        }
        else{
            res.status(404)
        }
    }
    catch(err){
        console.log(err)
        res.json({message:"Error occured while adding to watchlist"})
    }
}

async function removeFromWatchlist(req,res){
    console.log(req)
    const movieId = req.params.id;
    const userId = req.query.userId;
    console.log(userId)
    try{
        let user = await userModel.findById(userId)
        if(user){
            console.log(user.watchlist)
            user.watchlist = user.watchlist.filter(id => id !== movieId);
            console.log(user.watchlist)
            user =await user.save()
            res.status(200).json({user: user})
            console.log(user)
        }
        else{
            res.status(404).json({user: false})
        }
    }
    catch(err){
        console.log(err)
        res.json({message:"Error occured while adding to watchlist"})
    }
}

module.exports={getLikedMovies, getAllMovies, getMovie, getReviews, getAllLangs, getMoviesByFilter, addReview, getLikeCount, getDislikeCount, addDislike, removeLike, addLike, removeDislike, getLike, getAllGeneres, search, getMovieFile, getPosterFile, addToWatchlist, removeFromWatchlist}
