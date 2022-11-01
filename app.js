// Imports
const express = require('express');
const db = require('./db/db');
const app = express();
require('dotenv').config();
const basicAuth = require('basic-auth');

// Setting Data for Test purposes
const firstname = 'Max';
const lastname = 'Mustermann';
const mail = 'Max.Mustermann@web.de';
const tel = '0594 8749 49499';
const beginnDate = '01.08.2022';
const message = 'Initialisiert beim Start des Servers';
let contactArray = [
  firstname,
  lastname,
  mail,
  tel,
  beginnDate,
  message,
];
const contactTable = [contactArray];

// Execution of main method
main();


// Following ist the function declaration

/* Send Mail functionality */
/**
 *
 * @param {string} firstname
 * @param {string} lastname
 * @param {string} mail
 * @param {string} tel
 * @param {string} beginnDate
 * @param {string} message
 */
function sendMail(firstname, lastname, mail, tel, beginnDate, message) {
  if (
    !firstname ||
    !lastname ||
    !mail ||
    !tel ||
    !beginnDate ||
    !message
  ) {
    console.info('sendMail function application invalid parameter');
  } else {
    // Twilio SendGrid
    const sgMail = require('@sendgrid/mail');

    // Set API Key in enviromentvariable out of .env file
    sgMail.setApiKey(process.env.SECRET_KEY);

    // ToDo change for heroku

    // Building your text.
    const text =
      'Es gab für den ' +
      beginnDate +
      '<br> eine neue Anfrage auf der Mietgaragenwebsite von ' +
      firstname +
      '<br>  ' +
      lastname +
      '<br>  unter der Nummer: ' +
      tel +
      '<br> Email: ' +
      mail +
      '<br>  mit der folgenden Nachricht: ' +
      message;

    // Building your message.
    const msg = {
      to: 'Baalmann.Bernd@gmail.com', // Change to your recipient
      from: 'Bernd.Baalmann@web.de', // Change to your verified sender
      subject: 'Eine neue Anfrage auf der Mietgaragen Website',
      text: text,
      html: text,
    };
    sgMail
        .send(msg)
        .then(() => {
          console.info('Email sent');
        })
        .catch((error) => {
          console.error(error);
        });
  }
}


/**
 * Main method of application
 */
function main() {
  // Delete Contact Request with restart, not for production
  db.initialize();

  // Static Files Import
  app.use(express.static('public'));
  app.use('/css', express.static(__dirname + 'public/css'));
  app.use('/Skripte', express.static(__dirname + 'public/Skripte'));
  app.use('/img', express.static(__dirname + 'public/img'));

  // Request need to come in with basic Authorization
  const auth = function(req, res, next) {
    const user = basicAuth(req);
    if (!user || !user.name || !user.pass) {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      res.sendStatus(401);
      return;
    }
    if (user.name === 'admin' && user.pass === 'supersecret') {
      next();
    } else {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      res.sendStatus(401);
      return;
    }
  };

  // Requests from Client will be responded with these HTML pages
  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
  });

  app.get('/index', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
  });

  app.get('/FAQ', (req, res) => {
    res.sendFile(__dirname + '/views/FAQ.html');
  });

  app.get('/Fotos', (req, res) => {
    res.sendFile(__dirname + '/views/Fotos.html');
  });

  app.get('/Kontaktformular', (req, res) => {
    res.sendFile(__dirname + '/views/Kontaktformular.html');
  });

  app.get('/KontaktformularDaten', async (req, res) => {
    // console.log(contactTable); // Debugging Code

    // Get Data from database
    const contactRequest = await db.getContactRequests();

    // console.log(contactRequest[0]); // Debugging Code for Object

    contactRequest.forEach((element) => {
      // Fill Array with relevant data
      contactArray = [
        contactRequest[0].firstname,
        contactRequest[0].lastname,
        contactRequest[0].mail,
        contactRequest[0].tel,
        contactRequest[0].beginnDate,
        contactRequest[0].message,
      ];
      contactTable.unshift(contactArray);
      // console.log(contactTable); // Debugging Code for Array
    });

    res.statusCode = 200;
    // sending the data to frontend as an array of array
    res.send(contactTable);

    // oder das hier ist viel schicker....
    // res.send(await db.getContactRequests());
  });

  app.get('/Anfragen', auth, (req, res) => {
    res.sendFile(__dirname + '/views/Anfragen.html');
  });

  app.get('/Impressum', (req, res) => {
    res.sendFile(__dirname + '/views/Impressum.html');
  });

  app.get('/Datenschutz', (req, res) => {
    res.sendFile(__dirname + '/views/Datenschutzerklärung.html');
  });

  // API Middleware
  app.use(express.json()); // accepting data in json

  // Listen for form PUSH html response and use data to send whatsapp message
  app.post('/KontaktformularDaten', async (req, res) => {
    const {} = req.headers;
    const {firstname, lastname, mail, tel, beginnDate, message} =
      req.body;

    console.log(req.body);
    console.log(req.body.firstname);
    console.log(req.body[0]);

    contactTable.unshift([
      firstname,
      lastname,
      mail,
      tel,
      beginnDate,
      message,
    ]);

    await db.createContactRequest(
        firstname,
        lastname,
        mail,
        tel,
        beginnDate,
        message,
    );

    /* Send Mail to a number */
    // console.log("Sending Whatsapp Message"); // Debugging Code
    sendMail(firstname, lastname, mail, tel, beginnDate, message);
  });
}

module.exports = app;
