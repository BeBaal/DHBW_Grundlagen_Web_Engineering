/* eslint-disable no-unused-vars */

/* This Module contains unused code, which is not used in the current build */

/**
 * Send Whatsapp Message functionality
 * @param {string} firstname
 * @param {string} lastname
 * @param {string} mail
 * @param {string} tel
 * @param {string} beginnDate
 * @param {string} message
 */
function SendWaMessage(
    firstname,
    lastname,
    mail,
    tel,
    beginnDate,
    message,
) {
  // Authorisationparameters and starting whatsapp client
  const qrcode = require('qrcode-terminal');
  const {Client, LocalAuth} = require('whatsapp-web.js');

  const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
      args: ['--no-sandbox'], // for deployment on heroku
    },
  });

  client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
  });

  client.on('ready', () => {
    // console.log('Client is ready!'); // Debugging Client creation

    // Number or group where you want to send the message.
    // const number = 'Number deleted'; // not used
    const waGroup = 'Group deleted';

    // Your message.
    const text =
      'Es gab für den ' +
      beginnDate +
      ' eine neue Anfrage auf der Mietgaragenwebsite von ' +
      firstname +
      ' ' +
      lastname +
      ' unter der Nummer: ' +
      tel +
      ' / Email: ' +
      mail +
      ' mit der folgenden Nachricht: ' +
      message;

    // Getting chatId from the number and sending message.
    // we have to delete "+" from the beginning and add "@c.us" at the end.
    /* const chatId = number.substring(1) + "@c.us";
        client.sendMessage(chatId, text); */

    // Getting chatId from Whatsapp Group and sending message
    client.getChats().then((chats) => {
      const myGroup = chats.find((chat) => chat.name === waGroup);
      client.sendMessage(myGroup.id._serialized, text);
    });
  });

  client.initialize();
}
