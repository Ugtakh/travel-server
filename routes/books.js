const { Router } = require("express");
const { getBooks } = require("../controllers/books");

const router = Router();

router.get("/", getBooks);

module.exports = router;
