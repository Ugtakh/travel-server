const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const filePath = "./data/travels.json";

const createTravel = (req, res) => {
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(content);
    const newData = { ...req.body };
    data.categories.push(newData);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ message: "Амжилттай үүсгэлээ.", data: newData });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const getTravel = (req, res) => {
  const catId = req.params.id;
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    const parsedData = JSON.parse(data);
    const findData = parsedData.datas.find((el) => el.id === catId);
    res.status(200).json({ message: "success", data: findData });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const getAllTravels = () => {
  try {
    const datas = fs.readFileSync(filePath, "utf-8");
    const parsedData = JSON.parse(datas);
    res.status(200).json({ message: "success", data: parsedData.datas });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const updateTravel = (req, res) => {
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

    fs.writeFileSync(filePath, JSON.stringify(data));
    res
      .status(200)
      .json({ message: "success", data: parsedData.datas[findIndex] });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const deleteTravel = (req, res) => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");

    const parsedData = JSON.parse(data);
    console.log("DD", parsedData);
    const findArr = parsedData.datas.filter((el) => el.id !== req.params.id);
    const deletedCategory = parsedData.datas.find(
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
  getAllTravels,
  createTravel,
  getTravel,
  updateTravel,
  deleteTravel,
};
