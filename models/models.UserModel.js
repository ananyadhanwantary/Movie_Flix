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
userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
});
const userModel=mongoose.model("users",userSchema)
module.exports={userModel,userSchema}