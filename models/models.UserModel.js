const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")

const userSchema=mongoose.Schema({
    // _id:{
    //     type:Number,
    //     //required:true
    // },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    username:String,
    phone:Number,
    role:{
        type:String,
        default:"user"
    },
    active:{
        type:Boolean,
        default:true
    }
})
userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
});
const userModel=mongoose.model("users",userSchema)
module.exports={userModel,userSchema}