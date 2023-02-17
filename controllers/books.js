const fs = require("fs");

const getBooks = (req, res) => {
  const data = fs.readFileSync("./data/books.json", "utf-8");
  const parsedData = JSON.parse(data);
  res.status(200).json({ message: "success", books: parsedData.datas });
};

module.exports = { getBooks };
