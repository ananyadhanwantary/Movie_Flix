const mongoose=require("mongoose")

const RegisterSchema=mongoose.Schema({
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

const RegisterModel=mongoose.model("register",RegisterSchema)
module.exports={RegisterModel,RegisterSchema}