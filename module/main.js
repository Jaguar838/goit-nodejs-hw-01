// Получаем ф-и из module.js
// const md = require("./module"); // по вумолчанию ищет ф-л index.js/json
// Запускаем ф-и module.js
// md.info("Hi");

// Другой подход получить ф-и отдельно
const { info, log } = require("./module");
// info("Hi CommonJS");
log("Hi CommonJS");

import("./module.mjs").then((result) => {
  const { info } = result;
  log("Hi ECMAScript modules");
});
