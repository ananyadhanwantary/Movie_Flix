const RegisterModel=require("../models/models.UserModel")

async function saveUser(req,res){
    try{
        console.log(req.body)
        const {id,username,password,name,email,phone}=req.body
        const register =await RegisterModel.create({
            _id:id,
            username:username,
            password:password,
            name:name,
            email:email,
            phone:phone
        })
        res.status(200).json(register)

    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Could not Register"})
    }
}

async function checkUser(req,res){
    try{
        const user=await RegisterModel.findOne({email:req.body.email})
        if(user){
            const result=req.body.password==user.password;
            if(result){
                res.status(200).json({message:"Login successful"})
            }
            else{
                res.status(500).json({message:"Password DOES NOT match"})
            }
        }
        else{
            res.status(500).json({message:"User DOES NOT exist"})
        }
        
    }
    catch(err){
        res.status(500).json({message:"Error while logging in"})
    }
    return user.id
}
module.exports={saveUser,checkUser}