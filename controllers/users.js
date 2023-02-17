const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const filePath = "./data/users.json";

const getAllUsers = (req, res) => {
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.log("Файл уншихад алдаа гарлаа. !!!");
      return;
    }
    const parsedData = JSON.parse(data);
    res.status(201).json({ users: parsedData.datas });
  });
};

const getUser = (req, res) => {
  const { id } = req.params;
  const data = fs.readFileSync(filePath, "utf-8");
  const parsedData = JSON.parse(data);
  const user = parsedData.datas.find((el) => el.id === id);
  res.status(200).json({ user });
};

const createUser = (req, res) => {
  const { name, role = "user", email, password } = req.body;
  const data = fs.readFileSync(filePath, "utf-8");
  const parsedData = JSON.parse(data);
  const id = uuidv4();
  const salted = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salted);

  const newUser = {
    id,
    name,
    role,
    email,
    password: hashedPassword,
  };

  parsedData.datas.push(newUser);
  fs.writeFileSync(filePath, JSON.stringify(parsedData));

  res.status(201).json({ message: "Шинэ хэрэглэгчийгн амжилттай бүртгэлээ." });
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const data = fs.readFileSync(filePath, "utf-8");
  const parsedData = JSON.parse(data);
  const findIndex = parsedData.datas.findIndex((el) => el.id === id);
  parsedData.users[findIndex].name = name;
  fs.writeFileSync(filePath, JSON.stringify(parsedData));
  res
    .status(201)
    .json({ message: "Шинэ хэрэглэгчийн өгөгдөл амжилттай солигдлоо." });
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  const data = fs.readFileSync(filePath, "utf-8");
  const parsedData = JSON.parse(data);
  const findIndex = parsedData.datas.findIndex((el) => el.id === id);
  parsedData.datas.splice(findIndex, 1);
  fs.writeFileSync(filePath, JSON.stringify(parsedData));
  res
    .status(201)
    .json({ message: `${id} тай хэрэглэгч амжилттай устгагдлаа.` });
};

module.exports = { getAllUsers, getUser, createUser, updateUser, deleteUser };
