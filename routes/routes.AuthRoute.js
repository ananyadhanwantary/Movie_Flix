const { SaveUser,CheckUser } = require("../controllers/controller.AuthController.js");
const router = require("express").Router();

router.post("/signup/", SaveUser);
router.get("/login/",CheckUser);
module.exports = router;