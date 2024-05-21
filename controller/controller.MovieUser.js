const MovieModel=require("../models/models.movies")
const LikesModel = require("../models/models.like")
const {checkUser}=require("../controller/controller.RegisterLogin")
const mongoose = require("mongoose")

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
        const id=parseInt(req.params.id);
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

// async function addLike(req,res){
//     try{
//         const id = parseInt(req.params.id);
//         // console.log(req.params, typeof id)
//         var like = await MovieModel.findOne({'like._id' : id})
//         console.log(like.movieName)
//         if(!like){
//             res.status(404).json({message:"movie NOT found"})
//         }
//         // else{
//         //     like.noOfLikes+=1
//         //     like.likedUsers.push({
//         //         "_id": 21,
//         //         "email": "kodm@624gmail",
//         //         "password": "akhira@624",
//         //         "username": "akhira",
//         //         "phone": 7894561230
//         //       })
//         //     like = await MovieModel.findByIdAndUpdate(id,{"like":like})
//         //     res.status(200).json(like)
//         // }
//     }
//     catch(err){
//         console.log(err)
//         res.status(500).json({message:"Error in liking the movie"})
//     }
// }

// async function addLike(req, res) {
//     try {
//         const movieId = parseInt(req.params.id);
//         // const userId = req.body.userId; // Assuming the user ID is passed in the request body

//         // Find the movie by ID
//         const movie = await MovieModel.findById(movieId);
//         if (!movie) {
//             return res.status(404).json({ message: "Movie NOT found" });
//         }

//         // Check if the like document exists or create a new one
//         let like;
//         if (movie.like) {
//             like = await LikesModel.findById(movie.like._id);
//             console.log(like)
//             like.noOfLikes += 1;
//             // if (!like.likeduser.includes(userId)) {
//             //     like.likeduser.push(userId);
//             }
//         else {
//             like = new LikesModel({
//                 _id: new mongoose.Types.ObjectId(),
//                 noOfLikes: 1,
//                 // likeduser: [userId]
//             });
//             await like.save();
//             movie.like = like._id;
//         }

//         await like.save();
//         await movie.save();

//         res.status(200).json(movie);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ message: "Error in liking the movie" });
//     }
// }

async function addLike(req,res){
    try{
        const movieId=parseInt(req.params.id)
        const movie = await MovieModel.findById(movieId);
        console.log(movie.like[0].noOfLikes)
        // res.json(movie)
        if (!movie) {
          console.log('Movie not found');
        }
        currentLikes=movie.like[0].noOfLikes+1
        console.log(currentLikes)
        const updatedLike = await MovieModel.findOneAndUpdate({_id:movieId},{"movie.like[0].noOfLikes": currentLikes},{new:true});
        const update=await MovieModel.findById(movieId)
        res.json(update)
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Error in liking movie"})
    }
}

module.exports={getAllMovies,getMovie,addLike}
