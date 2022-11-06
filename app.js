/**
 * Dieses Skript handelt die Funktionalität der Application. Unter anderem
 * findet hier die Kommunikation mit der Datenbank, das Senden/Empfangen von
 * HTML Requests sowie die Authentifikation statt.
 */

// Imports
const express = require('express');
const db = require('./db/db');
const app = express();
require('dotenv').config();
const basicAuth = require('basic-auth');

// Variable declaration
let firstname;
let lastname;
let mail;
let tel;
let beginnDate;
let message;
let contactArray = [
  firstname,
  lastname,
  mail,
  tel,
  beginnDate,
  message,
];
let contactTable = [contactArray];

// Execution of main method
main();


// Following ist the function declaration


/**
 * This function is responsible for sending emails with the contact information
 * which was entered in the frontend.
 *
 * @param {string} firstname
 * @param {string} lastname
 * @param {string} mail
 * @param {string} tel
 * @param {string} beginDate
 * @param {string} message
 */
function sendMail(firstname, lastname, mail, tel, beginDate, message) {
  const isInputValid = (
    firstname != null &&
    lastname != null &&
    mail != null &&
    tel != null &&
    beginDate != null &&
    message != null);

  if ( isInputValid
  ) {
    // Twilio SendGrid
    const sgMail = require('@sendgrid/mail');

    // Set API Key in enviromentvariable out of .env file
    try {
      sgMail.setApiKey(process.env.SECRET_KEY);
    } catch (error) {
      sgMail.setApiKey(process.env.API_KEY_SENDGRID);
    }


    // ToDo change for heroku

    // Building your text.
    const text =
      'Es gab für den ' +
      beginDate +
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
  } else {
    console.info('sendMail function application invalid parameter');
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

  // Generell Path for the single page application
  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
  });


  // Load HTML content for the single page application
  app.get('/Startseite', (req, res) => {
    res.sendFile(__dirname + '/views/Startseite.html');
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


  app.get('/Impressum', (req, res) => {
    res.sendFile(__dirname + '/views/Impressum.html');
  });

  app.get('/Datenschutz', (req, res) => {
    res.sendFile(__dirname + '/views/Datenschutzerklärung.html');
  });

  // Both following statements not used by single page application
  // and access restricted
  app.get('/Anfragen', auth, (req, res) => {
    res.sendFile(__dirname + '/views/Anfragen.html');
  });


  // Send back Contactrequests for html table when authorization is correct
  app.get('/KontaktformularDaten', auth, async (req, res) => {
    // Get Data from database
    const contactRequests = await db.getContactRequests();

    // Reset Table
    contactTable = [];

    // fill Table with Arrays
    contactRequests.forEach((element) => {
      // Fill Array with relevant data
      contactArray = [
        element.firstname,
        element.lastname,
        element.mail,
        element.tel,
        element.beginDate,
        element.message,
      ];
      contactTable.unshift(contactArray);
    });

    res.statusCode = 200;
    // sending the data to frontend as an array of arrays
    res.send(contactTable);
  });


  // API Middleware wird gebraucht für Annahme der Daten aus dem Frontend
  app.use(express.json()); // accepting data in json

  // Listen for form PUSH html response and use data to send notification
  app.post('/KontaktformularDaten', async (req, res) => {
    const {} = req.headers;
    const {firstname, lastname, mail, tel, beginDate, message} =
      req.body;


    contactTable.unshift([
      firstname,
      lastname,
      mail,
      tel,
      beginDate,
      message,
    ]);

    await db.createContactRequest(
        firstname,
        lastname,
        mail,
        tel,
        beginDate,
        message,
    );

    /* Send Mail to a number */
    sendMail(firstname, lastname, mail, tel, beginDate, message);
  });
}

// Gets called in the server.js file
module.exports = app;
