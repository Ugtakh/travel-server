const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const usersRoute = require("./routes/users");
const categoriesRoute = require("./routes/categories");
const booksRoute = require("./routes/books");
const logger = require("./utils/logger");
// const conn = require("./config/db");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "azure_db",
});

const port = 8000;
// instance of express
const server = express();
// middlewares
server.use(cors());
server.use(express.json());
// own custom middlewares
server.use(logger);
// routers
server.use("/api/users", usersRoute);
server.use("/api/categories", categoriesRoute);
server.use("/api/books", booksRoute);
// test method

server.get("/", async (req, res) => {
  connection.query("SELECT * FROM azure_user", (err, result) => {
    if (err) {
      res.status(400).json({ message: err.message });
      return;
    }
    res
      .status(200)
      .json({ message: "AZURE SERVER: Хүсэлт Амжилттай", data: result });
  });
});
server.get("/:id", async (req, res) => {
  const id = req.params.id;
  connection.query(
    `SELECT * FROM azure_user WHERE aid=${id}`,
    (err, result) => {
      if (err) {
        res.status(400).json({ message: err.message });
        return;
      }

      res
        .status(200)
        .json({ message: "AZURE SERVER: Хүсэлт Амжилттай", data: result });
    }
  );
});

server.put("/:id", () => {
  const id = req.params.id;
  connection.query(
    `UPDATE azure_user SET` + query + `WHERE aid=${id}`,
    (err, result) => {
      if (err) {
        res.status(400).json({ message: err.message });
        return;
      }

      res
        .status(200)
        .json({ message: "AZURE SERVER: Хүсэлт Амжилттай", data: result });
    }
  );
});

// server listen
server.listen(port, () => {
  console.log(`Server is running at ${port}`);
});

module.exports = server;
