const fs = require("fs");

const getBooks = (req, res) => {
  try {
    const data = fs.readFileSync("./data/books.json", "utf-8");
    const parsedData = JSON.parse(data);
    res.status(200).json({ message: "success", books: parsedData.datas });
  } catch (err) {
    return res.status(400).json({ message: "failed", error: err.message });
  }
};

module.exports = { getBooks };
