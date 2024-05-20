const registerModel=require("../models/models.UserModel")

async function getAllUser(req,res){
    try{
        const users=await registerModel.find({})
        res.status(200).json(users)
    }
    catch(err){
        res.status(500).json({message:"Error in getting user details"})
    }
}

async function deleteUser(req,res){
    try{
        const {id}=req.params
        const user=await registerModel.findByIdAndDelete(id)
        if(!user){
            res.status(404).json({message:"User NOT found"})
        }
        res.status(200).json({message:"User deleted successfully"})
    }
    catch(err){
        res.status(500).json({message:"Error in deleting user"})
    }
}

async function userEdit(req,res){
    try{
        const {id}=req.params
        const user=await registerModel.findByIdAndUpdate(id,req.body)
        if(!user){
            res.status(404).json({message:"user DOES NOT exits"})
        }
        else{
            const updatedUser=await registerModel.findById(user)
            res.status(200).json(updatedUser)
        }

    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Problem in editing user details"})
    }
}
module.exports={getAllUser,deleteUser,userEdit}