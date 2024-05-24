const { SaveUser,CheckUser } = require("../controllers/controller.AuthController.js");
const router = require("express").Router();

router.post("/signup", SaveUser);
router.post("/login",CheckUser);
module.exports = router;