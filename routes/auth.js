const router = require("express").Router();
const { authCtrl } = require("../controllers/authConrtroler")

router.post("/signup", authCtrl.signup);

router.post("/login", authCtrl.login);

router.post("/logout", authCtrl.logout);

module.exports = router;