const { userModel } = require("../models/models.UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");
const mongoose=require("mongoose")

const SaveUser = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    } else {
      const user = new userModel(req.body);
      await user.save();
      res
        .status(200)
        .json({ message: "User signed in successfully", success: true, user });
    }
  } catch (error) {
    console.error(error);
  }
};

const CheckUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User does not exist!! " });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.status(500).json({ message: "Incorrect password or email" });
    }
    const token = createSecretToken(user._id);
    res.status(200).json({
      token: token,
      login: true,
      role: user.role,
      userId: user._id,
      user: user,
      message: "User logged in successfully",
    });
  } catch (error) {
    console.error(error);
  }
};

const changePassword = async (req, res) => {
  try {
    const {  currentPassword, newPassword } = req.body;
    const userId=req.body.userId;
    const user = await userModel.findOne({_id:userId});
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const auth = await bcrypt.compare(currentPassword, user.password);
    if (!auth)
      return res
        .status(400)
        .json({ message: "Current password is incorrect." });
        
    user.password=newPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully." });
  } catch (err) {
    console.error(err);
  }
};


module.exports = {
  SaveUser,
  CheckUser,
  changePassword
};
