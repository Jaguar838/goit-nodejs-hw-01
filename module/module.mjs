//Modules: ECMAScript modules *.mjs

const info = msg => {
  console.log(`Info: ${msg}`);
};

// const log = (msg) => {
//   console.log(`Log: ${msg}`);
// };

export = {
  info,
};
console.log(export);
//Основное отличие:
// CommonJS modules - синхронные
// ECMAScript modules - асисинхронные async... await
