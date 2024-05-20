const axios=require("axios")
async function getAllMovies(req,res){
    try{
        //res.json({message:"Fetching all Movies"})
        const movies=await fetch("https://freetestapi.com/api/v1/movies")
        .then((response)=>response.json())
        .then((data)=>res.send(data))
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Problem occured while Fetching movies"})
    }
}
module.exports={getAllMovies}