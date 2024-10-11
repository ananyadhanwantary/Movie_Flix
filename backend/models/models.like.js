const mongoose = require("mongoose");
const { userSchema } = require("../models/models.UserModel");

const likeSchema = mongoose.Schema({
    noOfLikes: {
        type: Number,
        default: 0,
    },
    likedUsers: {
        type: [userSchema],
        unique: true,  
    },
    noOfDislikes: {
        type: Number,
        default: 0,
    },
    dislikedUsers: {
        type: [userSchema],
        unique: true,  
    }
});

likeSchema.index({ 
    "likedUsers._id": 1,  
}, { unique: true });

likeSchema.index({ 
    "dislikedUsers._id": 1,  
}, { unique: true });

module.exports = { likeSchema };
