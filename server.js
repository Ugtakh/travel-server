const express = require("express");
const cors = require("cors");
const usersRoute = require("./routes/users");
const categoriesRoute = require("./routes/categories");
const booksRoute = require("./routes/books");
const logger = require("./utils/logger");

const port = 8000;
// instance of express
const server = express();
// middlewares
server.use(cors());
server.use(express.json());
// server.use(express.static(path.join(__dirname, "public")));
// own custom middlewares
server.use(logger);
// routers
server.use("/api/users", usersRoute);
server.use("/api/categories", categoriesRoute);
server.use("/api/books", booksRoute);
// test method
server.get("/", (req, res) => {
  res.send("Hello World");
});

// server listen
server.listen(port, () => {
  console.log(`Server is running at ${port}`);
});

module.exports = server;
