const {userModel}=require("../models/models.UserModel")

async function getUser(req,res){
    var id = (req.params.id)
    try{
        const user = await userModel.findById(id)
        if(!user){
            res.status(404).json({message:"User NOT found"})
        }
        else
            res.status(200).json(user)
    }
    catch(err){
        res.status(404).json({msg:"user not found"})
    }
}

module.exports={getUser}