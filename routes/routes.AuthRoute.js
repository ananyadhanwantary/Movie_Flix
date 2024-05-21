const { Signup } = require("../controller/controller.AuthController.js");
const router = require("express").Router();

router.post("/signup", Signup);

module.exports = router;