const { SaveUser,CheckUser } = require("../controller/controller.AuthController.js");
const router = require("express").Router();

router.post("/signup/", SaveUser);
router.get("/login/",CheckUser);
module.exports = router;