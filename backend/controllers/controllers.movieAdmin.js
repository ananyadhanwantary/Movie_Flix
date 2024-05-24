const MovieModel=require("../models/models.movies")

async function addMovie(req,res){
    try{
        const{movieName, movieUrl,moviePosterUrl,genre,movieCast}=req.body

        const movie=await MovieModel.create({
            // _id:movieId,
            movieName:movieName, 
            movieUrl:movieUrl,
            moviePosterUrl:moviePosterUrl,
            movieCast:movieCast,
            genre:genre,
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

async function getMoviesByGenre(req,res){
    try{
        const movies=await MovieModel.find({})
        moviesByGenre = {}
        var genres= new Set()
        movies.forEach( (m) =>{} )
        movies.forEach( (movie) => {
            genres.add(movie.genre)
        });
        console.log(genres)
        genres.forEach(genre => {
            moviesByGenre[genre]=movies.filter(movie => movie.genre === genre)
        })
        console.log(moviesByGenre)
        res.status(200).json(moviesByGenre)
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Error in getting movie details"})
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

async function addLike(req,res){
    try{
        const movieId=(req.params.id)
        const movie = await MovieModel.findById(movieId);
        if (!movie) {
            console.log('Movie not found');
        }
        var userId=req.userId
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
        res.send(movie.like.noOfLikes)
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

module.exports={addMovie,getAllMovies,getMovie,updateMovie,deleteMovie,getComments,getMoviesByGenre,addComment,getLikeCount,removeLike,addLike}