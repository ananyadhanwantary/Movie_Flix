const {userModel}=require("../models/models.UserModel")

async function getAllUser(req,res){
    try{
        const users=await userModel.find({})
        res.status(200).json(users)
    }
    catch(err){
        res.status(500).json({message:"Error in getting user details"})
    }
}

async function deleteUser(req,res){
    try{
        const {id}=req.params
        const user=await userModel.findByIdAndDelete(id)
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
        const user=await userModel.findByIdAndUpdate(id,req.body)
        if(!user){
            res.status(404).json({message:"user DOES NOT exits"})
        }
        else{
            const updatedUser=await userModel.findById(user)
            res.status(200).json(updatedUser)
        }

    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Problem in editing user details"})
    }
}
/*const CheckAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password ){
            return res.json({message:'All fields are required'})
        }
        const user = await .findOne({ email });
        if(!user){
            return res.json({message:'User does not exist!! ' }) 
        }
        const auth = await bcrypt.compare(password,user.password)
        if (!auth) {
            return res.json({message:'Incorrect password or email' }) 
        }
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });
        res.status(201).json({ message: "User logged in successfully", success: true });
    } catch (error) {
        console.error(error);
    }
}*/
module.exports={getAllUser,deleteUser,userEdit}