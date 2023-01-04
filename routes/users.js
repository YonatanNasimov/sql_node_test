const router = require("express").Router();
const { userCtrl } = require("../controllers/usersControler")

router.get("/", userCtrl.getAll);

module.exports = router;