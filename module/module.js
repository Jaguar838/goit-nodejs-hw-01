// CommonJS modules
const info = (msg) => {
  console.log(`Info: ${msg}`);
};
const log = (msg) => {
  console.log(`Log: ${msg}`);
};
// Всегда используйте module.exports потому что сам
// exports - это ссылка на module
// ошибка новичка если вы exports что то присвоите то ничего не произойдет
//Причина: объект передается по ссылке, а ссылку можна перебить.
module.exports = {
  log,
};
