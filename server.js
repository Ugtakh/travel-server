const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const { CLIENT_RENEG_LIMIT } = require("tls");

const port = 8000;

const server = express();
server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ message: "Hello Express Server" });
});

// Start of User
server.post("/signup", (req, res) => {
  const { name, role = "user", email, password } = req.body;
  const data = fs.readFileSync("users.json", "utf-8");
  const parsedData = JSON.parse(data);
  const id = uuidv4();
  const salted = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salted);
  console.log(hashedPassword);

  const newUser = {
    id,
    name,
    role,
    email,
    password: hashedPassword,
  };

  parsedData.users.push(newUser);
  fs.writeFileSync("users.json", JSON.stringify(parsedData));

  res.status(201).json({ message: "Шинэ хэрэглэгчийгн амжилттай бүртгэлээ." });
});

server.post("/signin", (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  const data = fs.readFileSync("users.json", "utf-8");
  const parsedData = JSON.parse(data);
  const findUser = parsedData.users.find((user) => user.email === email);
  console.log(findUser);
  if (!findUser) {
    return res.status(401).json({ message: "Ийм хэрэглэгч олдсонгүй" });
  }

  const isCheck = bcrypt.compareSync(password, findUser.password);
  if (isCheck) {
    res.status(200).json({ message: "Амжилттай нэвтэрлээ.", user: findUser });
  } else {
    return res
      .status(401)
      .json({ message: "Имэйл эсвэл нууц үг буруу байна ш дээ.", user: null });
  }
});

server.get("/users", (req, res) => {
  fs.readFile("users.json", "utf-8", (err, data) => {
    if (err) {
      console.log("Файл уншихад алдаа гарлаа. !!!");
      return;
    }
    console.log(data);
    const parsedData = JSON.parse(data);
    res.status(201).json({ users: parsedData.users });
  });
});

server.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const data = fs.readFileSync("users.json", "utf-8");
  const parsedData = JSON.parse(data);
  const user = parsedData.users.find((el) => el.id === id);
  res.status(200).json({ user });
});

server.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const data = fs.readFileSync("users.json", "utf-8");
  const parsedData = JSON.parse(data);
  const findIndex = parsedData.users.findIndex((el) => el.id === id);
  parsedData.users[findIndex].name = name;
  fs.writeFileSync("users.json", JSON.stringify(parsedData));
  res
    .status(201)
    .json({ message: "Шинэ хэрэглэгчийн өгөгдөл амжилттай солигдлоо." });
});

server.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const data = fs.readFileSync("users.json", "utf-8");
  const parsedData = JSON.parse(data);
  const findIndex = parsedData.users.findIndex((el) => el.id === id);
  parsedData.users.splice(findIndex, 1);
  fs.writeFileSync("users.json", JSON.stringify(parsedData));
  res
    .status(201)
    .json({ message: `${id} тай хэрэглэгч амжилттай устгагдлаа.` });
});

// End of User

//Start of Category
server.post("/categories", (req, res) => {
  // req.body;

  try {
    const content = fs.readFileSync("categories.json", "utf-8");
    console.log("Con", content);
    const data = JSON.parse(content);
    console.log("Data", data.categories);
    const newData = { ...req.body };
    data.categories.push(newData);
    fs.writeFileSync("categories.json", JSON.stringify(data));
    res.status(201).json({ message: "Амжилттай үүсгэлээ.", data: newData });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

server.get("/categories", (req, res) => {
  try {
    const categoriesData = fs.readFileSync("categories.json", "utf-8");
    console.log("CC", categoriesData);
    const data = JSON.parse(categoriesData);
    console.log("DD", data);
    res.status(200).json({ message: "success", data });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});
//End of Category

server.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
