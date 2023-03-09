console.log("OB");

const body = { name: "naraa", age: 23 };

const keys = Object.keys(body);
const values = Object.values({ name: "naraa" });
const ob = Object.entries(body);

console.log(keys);
console.log(values);

const a = keys.map((key) => `${key}="${body[key]}"`);
const b = a.join();
console.log(a);

// UPDATE tableName SET b WHERE key1 = value1 AND key2 = value2 AND key3 = value3;

const convert = async (emp_no, updatedData) => {
  console.time("2023:03:03");
  let [result] = "";
  for (let i = 0; i < Object.keys(updatedData).length; i++) {
    result = await pool.query(
      `UPDATE employees SET ${Object.keys(updatedData)[i]} ='${
        Object.values(updatedData)[i]
      }'  WHERE emp_no = ${emp_no}`
    );
  }
  console.time("2023:03:03");
  return result;
};

const ss = convert(1, {});

console.log("Convert:");
