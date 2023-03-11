// console.log("DESTRUCT");

// const body = { name: "naraa", age: 23 };

// const keys = Object.keys(body);
// const values = Object.values({ name: "naraa" });
// const ob = Object.entries(body);

// console.log(keys);
// console.log(values);

// const a = keys.map((key) => `${key}="${body[key]}"`);
// const b = a.join();
// console.log(a);

const ob = ["name='Naraa'", "age='23'"];

console.log(ob);
console.log(ob.join());
console.log(ob.join(""));
console.log(ob.join(","));
