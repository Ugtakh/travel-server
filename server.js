const express = require("express");
const cors = require("cors");

const usersRoute = require("./routes/users");
const categoriesRoute = require("./routes/categories");
const booksRoute = require("./routes/books");

const port = 8000;

const server = express();
// middlewares
server.use(cors());
server.use(express.json());

server.use("/users", usersRoute);
server.use("/categories", categoriesRoute);
server.use("/books", booksRoute);

server.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
