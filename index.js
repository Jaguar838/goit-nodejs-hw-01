// # Получаем и выводим весь список контактов в виде таблицы (console.table)
// node index.js --action list

// # Получаем контакт по id
// node index.js --action get --id 5

// # Добавялем контакт
// node index.js --action add --name Mango --email mango@gmail.com --phone 322-22-22

// # Удаляем контакт
// node index.js --action remove --id=3

// console.log(`Hello Node.js v${process.versions.node}!`);

const { Command } = require('commander');
const chalk = require('chalk');

const {
  listContacts,
  getContactId,
  removeContact,
  addContact,
} = require('./contacts');

const program = new Command();
program
  .helpOption('-h, --help', 'read more information')
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'help':
      console.log(
        'node index.js --action list -- Выводим весь список контактов',
      );
      console.log(
        'node index.js --action get --id 5 -- Получаем контакт по id',
      );
      console.log(
        'node index.js --action add --name Mango --email mango@gmail.com --phone 322-22-22' +
          ' -- Добавялем контакт',
      );
      console.log(
        'node index.js --action remove --id=3 -- Удаляем контакт по id',
      );
      break;
    case 'list':
      try {
        const contacts = await listContacts();

        if (contacts.length) {
          console.log(
            '\n',
            chalk.green(
              ' В списке ' +
                chalk.blue.bold(contacts.length) +
                '-контактов, смотрите таблицу ниже >>>',
            ),
          );
          console.table(contacts);

          return;
        }

        console.log('В списке пока нет контактов');
      } catch (err) {
        console.error(err.message);
      }
      break;

    case 'get':
      try {
        const contact = await getContactId(id);

        if (contact) {
          console.log(
            '\n',
            chalk.green(
              'Найден контакт ' +
                chalk.blue.bold(contact.name) +
                ' с ID= ' +
                chalk.blue.bold(contact.id),
            ),
          );

          console.table(contact);

          return;
        }
        console.log(
          chalk.red(
            'Нет контакта с ID= ' +
              chalk.blue.bold(id) +
              ' в списке, смотрите таблицу ниже >>>',
          ),
        );
        console.table(contact);
      } catch (err) {
        console.error(err.message);
      }
      break;

    case 'add':
      try {
        const [newContact, contacts] = await addContact(name, email, phone);

        console.log(
          '\n',
          chalk.green(
            'Контакт ' +
              chalk.blue.bold(newContact.name) +
              ' был добавлен в список контактов, id= ' +
              chalk.blue.bold(newContact.id) +
              ' смотрите таблицу ниже >>>',
          ),
        );
        console.table(contacts);
      } catch (err) {
        console.error(err.message);
      }
      break;

    case 'remove':
      try {
        const contacts = await removeContact(id);

        if (!contacts) {
          console.log(
            chalk.red(
              'Нет контакта с ID= ' +
                chalk.blue.bold(id) +
                ' в списке, смотрите таблицу ниже >>>',
            ),
          );
          const contacts = await listContacts();
          console.table(contacts);

          return;
        }

        console.log(
          '\n',
          chalk.green(
            'Контакт с  ID= ' +
              chalk.blue.bold(id) +
              ' был удален из списка, смотрите таблицу ниже >>>',
          ),
        );

        if (!contacts.length) {
          console.log(
            chalk.red(
              'Это был последний контакт. Список контактов теперь пуст!',
            ),
          );
          return;
        }

        console.table(contacts);
      } catch (err) {
        console.error(err.message);
      }
      break;

    default:
      console.warn('\x1B[31m Неизвестная команда!');
  }
}

invokeAction(argv);
