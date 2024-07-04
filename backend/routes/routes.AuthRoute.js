const { SaveUser,CheckUser, changePassword } = require("../controllers/controller.AuthController.js");
const router = require("express").Router();

router.post("/signup", SaveUser);
router.post("/login",CheckUser);
router.post("/changePassword",changePassword);
module.exports = router;