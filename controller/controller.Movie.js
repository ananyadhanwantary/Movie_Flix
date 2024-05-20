const axios=require("axios")
async function getAllMovies(req,res){
    try{
        //res.json({message:"Fetching all Movies"})
        const movies=await fetch("http://freetestapi.com/api/v1/movies")
        const data=await movies.json()
        console.log(data)
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Problem occured while Fetching movies"})
    }
}
module.exports={getAllMovies}