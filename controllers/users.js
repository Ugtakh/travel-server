const bcrypt = require("bcrypt");
const connection = require("../config/db");
const { convertQueryStr } = require("../utils/convertQuery");

const getAllUsers = (req, res) => {
  const query = `SELECT id, name, email, phone_number, profileImg FROM user`;
  connection.query(query, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    console.log(result);
    res.status(200).json({ data: result });
  });
};

const getUser = (req, res) => {
  const { id } = req.params;
  const query = `SELECT id, name, email, phone_number, profileImg FROM user WHERE id=?`;
  connection.query(query, [id], (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json({ data: result });
  });
};

const createUser = (req, res) => {
  const { name, email, password, phoneNumber } = req.body;

  const salted = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salted);

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
  const updateData = convertQueryStr(req.body);
  const query = `UPDATE user SET ${updateData} WHERE id=?`;
  connection.query(query, [id], (err, result) => {
    if (err) {
      res.status(400).json({ message: err.message });
      return;
    }

    res.status(201).json({
      message: `${id} тэй хэрэглэгчийн өгөгдөл амжилттай шинэчлэгдлээ.`,
    });
  });
};

const deleteUser = (req, res) => {
  const { id } = req.params;

  const query = `DELETE user WHERE id=?`;
  connection.query(query, [id], (err, result) => {
    if (err) {
      res.status(400).json({ message: err.message });
      return;
    }
    res
      .status(201)
      .json({ message: `${id} тай хэрэглэгч амжилттай устгагдлаа.` });
  });
};

module.exports = { getAllUsers, getUser, createUser, updateUser, deleteUser };
