const { SaveUser,CheckUser, changePassword } = require("../controllers/controllers.AuthController.js");
const router = require("express").Router();

router.post("/signup", SaveUser);
router.post("/login",CheckUser);
router.post("/changePassword",changePassword);
module.exports = router;