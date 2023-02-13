const { Router } = require("express");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const router = Router();

//Start of Category
router.post("/", (req, res) => {
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

router.get("/", (req, res) => {
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

router.put("/:id", (req, res) => {
  try {
    const categoriesData = fs.readFileSync("categories.json", "utf-8");
    console.log("CC", categoriesData);
    const data = JSON.parse(categoriesData);
    console.log("DD", data);
    const findIndex = data.categoriesData.findIndex(
      (el) => el.id === req.params.id
    );

    if (findIndex === -1) {
      return res.status(404).json({ message: "not found", data: null });
    }

    data.categoriesData[findIndex] = {
      ...data.categoriesData[findIndex],
      ...req.body,
    };

    fs.writeFileSync("categories.json", JSON.stringify(data));
    res
      .status(200)
      .json({ message: "success", data: data.categoriesData[findIndex] });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", (req, res) => {
  try {
    const categoriesData = fs.readFileSync("categories.json", "utf-8");
    console.log("CC", categoriesData);
    const data = JSON.parse(categoriesData);
    console.log("DD", data);
    const findArr = data.categoriesData.filter((el) => el.id !== req.params.id);
    const deletedCategory = data.categoriesData.find(
      (el) => el.id === req.params.id
    );

    if (!(findArr.length > 0)) {
      return res.status(404).json({ message: "not found", data: null });
    }

    data.categoriesData = findArr;

    fs.writeFileSync("categories.json", JSON.stringify(data));
    res.status(200).json({ message: "success", data: deletedCategory });
  } catch (error) {
    return res.status(400).json({ message: err.message });
  }
});
//End of Category
module.exports = router;
