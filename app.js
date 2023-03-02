console.log("OB");

const body = { name: "naraa", age: 23 };

const keys = Object.keys(body);
const values = Object.values({ name: "naraa" });
const ob = Object.entries(body);

console.log(keys);
console.log(values);

const a = keys.map((key) => `${key}=${body[key]}`);
const b = a.join();
console.log(a);
console.log(b);

// UPDATE tableName SET b WHERE key1 = value1 AND key2 = value2 AND key3 = value3;
