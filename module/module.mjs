//Modules: ECMAScript modules *.mjs

const info = (msg) => {
  console.log(`Info: ${msg}`);
};

// const log = (msg) => {
//   console.log(`Log: ${msg}`);
// };

exports = {
  info,
};
console.log(exports);
//Основное отличие:
// CommonJS modules - синхронные
// ECMAScript modules - асисинхронные async... await
