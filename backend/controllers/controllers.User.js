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

async function userEdit(req,res){
    try{
        const {id}=req.params
        const user=await userModel.findByIdAndUpdate(id,req.body)
        if(!user){
            res.status(404).json({message:"user DOES NOT exits"})
        }
        else{
            const updatedUser=await userModel.findById(user)
            res.status(200).json({updatedUser,message:"user details updated successfully"})
        }

    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Problem in editing user details"})
    }
}
module.exports={getUser, userEdit}