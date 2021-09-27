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
  getContactById,
  removeContact,
  addContact,
} = require('./contacts');

const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      try {
        const contacts = await listContacts();

        if (contacts.length) {
          console.log(
            '\n',
            chalk.green(
              chalk.blue.bold(contacts.length) +
                ' contacts in the list, see the table below >>>',
            ),
          );
          console.table(contacts);

          return;
        }

        console.log('There are no contacts in the list yet');
      } catch (err) {
        console.error(err.message);
      }
      break;

    case 'get':
      try {
        const contact = await getContactById(id);

        if (contact) {
          console.log(
            '\n',
            chalk.green(
              'Found contact ' +
                chalk.blue.bold(contact.name) +
                ' with ID: ' +
                chalk.blue.bold(contact.id),
            ),
          );

          console.table(contact);

          return;
        }
        console.log(
          chalk.yellow(
            'There in no contact with ID: ' +
              chalk.blue.bold(id) +
              ' in the list',
          ),
        );
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
            'Contact ' +
              chalk.blue.bold(newContact.name) +
              ' added to list with id: ' +
              chalk.blue.bold(newContact.id),
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
            chalk.yellow(
              'There in no contact with ID: ' +
                chalk.blue.bold(id) +
                ' in the list',
            ),
          );

          return;
        }

        console.log(
          '\n',
          chalk.green(
            'Contact with ID: ' +
              chalk.blue.bold(id) +
              ' was deleted from the list',
          ),
        );

        if (!contacts.length) {
          console.log(
            chalk.yellow('It was the last contact. The list now is empty!'),
          );
          return;
        }

        console.table(contacts);
      } catch (err) {
        console.error(err.message);
      }
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
