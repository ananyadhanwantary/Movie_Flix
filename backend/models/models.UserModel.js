const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")
const userSchema=mongoose.Schema({
    email:{
        type:String,
        required:true,
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
    },
    watchlist:{
        type: [String],
        default: [],
    }
})

userSchema.methods.addToWatchlist = function (movieId) {
    // Ensure only unique movie IDs are added
    if (!this.watchlist.includes(movieId)) {
        this.watchlist.push(movieId);
    }
    return this.save();
};

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 12);
    next();
});
const userModel=mongoose.model("users",userSchema)
module.exports={userModel,userSchema}