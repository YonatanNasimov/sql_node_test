const router = require("express").Router();
const { bookCtrl } = require("../controllers/bookControler");
const { auth } = require("../middlewares/auth");

router.get("/",auth, bookCtrl.getAllBooks);

router.get("/:id", auth, bookCtrl.getBookById);

router.post("/", auth, bookCtrl.createNewBook);

router.delete("/:id", auth, bookCtrl.deleteBook);

router.put("/:id", auth, bookCtrl.updateBook);

module.exports = router;