const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const connection = require("../config/db");

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
  const query = `SELECT * FROM user WHERE id=?`;
  connection.query(query, [id], (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json({ data: result[0] });
  });
};

const createUser = (req, res) => {
  const { name, email, password, phoneNumber } = req.body;
  const salted = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salted);

  // console.log(name);
  // console.log(email);
  // console.log(password);
  // console.log(phoneNumber);
  // res.status(201).json({ message: "OK" });

  const query =
    "INSERT INTO user (id, name,email,password, phone_number, profileImg) VALUES(null, ?, ?, ?, ?, ?)";
  connection.query(
    query,
    [name, email, hashedPassword, phoneNumber, "url"],
    (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res
        .status(201)
        .json({ message: "Шинэ хэрэглэгч амжилттай бүртгэгдлээ." });
    }
  );
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
