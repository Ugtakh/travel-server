const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const filePath = "./data/categories.json";

const createCategory = (req, res) => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    const parsedData = JSON.parse(data);
    const newData = { ...req.body };
    parsedData.datas.push(newData);
    fs.writeFileSync(filePath, JSON.stringify(parsedData));
    res.status(201).json({ message: "Амжилттай үүсгэлээ.", data: newData });
  } catch (err) {
    return res.status(400).json({ message: "failed", error: err.message });
  }
};

const getCategory = (req, res) => {
  const catId = req.params.id;
  try {
    const categoriesData = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(categoriesData);
    const findData = data.categoriesData.find((el) => el.id === catId);
    res.status(200).json({ message: "success", data: findData });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const getAllCategories = (req, res) => {
  // try {
  const data = fs.readFileSync(filePath, "utf-8");
  const parsedData = JSON.parse(data);
  res.status(200).json({ message: "success", data: parsedData.datas });
  // } catch (err) {
  //   return res.status(400).json({ message: "failed", error: err.message });
  // }
};

const updateCategory = (req, res) => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    const parsedData = JSON.parse(data);
    const findIndex = parsedData.datas.findIndex(
      (el) => el.id === req.params.id
    );

    if (findIndex === -1) {
      return res.status(404).json({ message: "not found", data: null });
    }

    parsedData.datas[findIndex] = {
      ...parsedData.datas[findIndex],
      ...req.body,
    };

    fs.writeFileSync(filePath, JSON.stringify(parsedData));
    res
      .status(200)
      .json({ message: "success", data: parsedData.datas[findIndex] });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const deleteCategory = (req, res) => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");

    const parsedData = JSON.parse(data);

    const findArr = parsedData.datas.filter((el) => el.id !== req.params.id);
    const deletedCategory = data.categoriesData.find(
      (el) => el.id === req.params.id
    );

    if (!(findArr.length > 0)) {
      return res.status(404).json({ message: "not found", data: null });
    }

    parsedData.datas = findArr;

    fs.writeFileSync(filePath, JSON.stringify(parsedData));
    res.status(200).json({ message: "success", data: deletedCategory });
  } catch (error) {
    return res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllCategories,
  createCategory,
  getCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
