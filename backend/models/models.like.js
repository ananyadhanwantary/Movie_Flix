const mongoose = require("mongoose");
const { userSchema } = require("../models/models.UserModel");

const likeSchema = mongoose.Schema({
    noOfLikes: {
        type: Number,
        default: 0,
    },
    likedUsers: {
        type: [userSchema],
        default: [],
    },
    noOfDislikes: {
        type: Number,
        default: 0,
    },
    dislikedUsers: {
        type: [userSchema],
        default: [],
    }
});

module.exports = { likeSchema };
