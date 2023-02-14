const { Router } = require("express");
const fs = require("fs");

const router = Router();

router.get("/", (req, res) => {
  const data = fs.readFileSync("books.json", "utf-8");
  const parsedData = JSON.parse(data);
  res.status(200).json({ message: "success", books: parsedData.books });
});

module.exports = router;
