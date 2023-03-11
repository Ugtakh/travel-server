exports.convertQueryStr = (obj) => {
  return Object.keys(obj)
    .map((key) => `${key}='${obj[key]}'`)
    .join();
};
