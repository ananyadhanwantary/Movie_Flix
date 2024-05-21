const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    _id:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    username:String,
    phone:Number,
    role:String,
    active:Boolean
})

const userModel=mongoose.model("Users",RegisterSchema)
module.exports={userModel,userSchema}