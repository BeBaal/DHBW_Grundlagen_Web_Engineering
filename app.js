// Imports
const express = require("express");
const db = require("./db/db");
const app = express();
require("dotenv").config();
var basicAuth = require("basic-auth");

// Setting Data
const l_firstname = "Max";
const l_lastname = "Mustermann";
const l_mail = "Max.Mustermann@web.de";
const l_tel = "0594 8749 49499";
const l_b_date = "01.08.2022";
const l_message = "Initialisiert auf Serverseite";
let exampleArray = [
  l_firstname,
  l_lastname,
  l_mail,
  l_tel,
  l_b_date,
  l_message,
];
let exampleTable = [exampleArray];

// Execution of main method
main();

// Following ist the function declaration
//
// Send Whatsapp Message functionality
function SendWaMessage(
  l_firstname,
  l_lastname,
  l_mail,
  l_tel,
  l_b_date,
  l_message
) {
  // Authorisationparameters and starting whatsapp client
  const qrcode = require("qrcode-terminal");
  const { Client, LocalAuth } = require("whatsapp-web.js");

  const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
      args: ["--no-sandbox"], // for deployment on heroku
    },
  });

  client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
  });

  client.on("ready", () => {
    //console.log('Client is ready!'); // Debugging Client creation

    // Number or group where you want to send the message.
    const number = "Number deleted"; // not used
    const waGroup = "Group deleted";

    // Your message.
    const text =
      "Es gab für den " +
      l_b_date +
      " eine neue Anfrage auf der Mietgaragenwebsite von " +
      l_firstname +
      " " +
      l_lastname +
      " unter der Nummer: " +
      l_tel +
      " / Email: " +
      l_mail +
      " mit der folgenden Nachricht: " +
      l_message;

    // Getting chatId from the number and sending message.
    /* const chatId = number.substring(1) + "@c.us"; // we have to delete "+" from the beginning and add "@c.us" at the end of the number.
        client.sendMessage(chatId, text); */

    // Getting chatId from Whatsapp Group and sending message
    client.getChats().then((chats) => {
      const myGroup = chats.find((chat) => chat.name === waGroup);
      client.sendMessage(myGroup.id._serialized, text);
    });
  });

  client.initialize();
}

/* Send Mail functionality */
function SendMail(l_firstname, l_lastname, l_mail, l_tel, l_b_date, l_message) {
  // Twilio SendGrid
  const sgMail = require("@sendgrid/mail");

  // Set API Key in enviromentvariable out of .env file
  sgMail.setApiKey(process.env.SECRET_KEY);
  //console.log(process.env.SECRET_KEY); // Debugging Code

  // Building your text.
  const text =
    "Es gab für den " +
    l_b_date +
    "<br> eine neue Anfrage auf der Mietgaragenwebsite von " +
    l_firstname +
    "<br>  " +
    l_lastname +
    "<br>  unter der Nummer: " +
    l_tel +
    "<br> Email: " +
    l_mail +
    "<br>  mit der folgenden Nachricht: " +
    l_message;

  // Building your message.
  const msg = {
    to: "Baalmann.Bernd@gmail.com", // Change to your recipient
    from: "Bernd.Baalmann@web.de", // Change to your verified sender
    subject: "Eine neue Anfrage auf der Mietgaragen Website",
    text: text,
    html: text,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
}

// Main method of application
function main() {
  // Delete Contact Request with restart, not for production
  db.initialize();

  // Static Files Import
  app.use(express.static("public"));
  app.use("/css", express.static(__dirname + "public/css"));
  app.use("/Skripte", express.static(__dirname + "public/Skripte"));
  app.use("/img", express.static(__dirname + "public/img"));

  //Request need to come in with basic Authorization
  var auth = function (req, res, next) {
    var user = basicAuth(req);
    if (!user || !user.name || !user.pass) {
      res.set("WWW-Authenticate", "Basic realm=Authorization Required");
      res.sendStatus(401);
      return;
    }
    if (user.name === "admin" && user.pass === "supersecret") {
      next();
    } else {
      res.set("WWW-Authenticate", "Basic realm=Authorization Required");
      res.sendStatus(401);
      return;
    }
  };

  // Requests from Client will be responded with these HTML pages
  app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
  });

  app.get("/index", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
  });

  app.get("/FAQ", (req, res) => {
    res.sendFile(__dirname + "/views/FAQ.html");
  });

  app.get("/Fotos", (req, res) => {
    res.sendFile(__dirname + "/views/Fotos.html");
  });

  app.get("/Kontaktformular", (req, res) => {
    res.sendFile(__dirname + "/views/Kontaktformular.html");
  });

  app.get("/KontaktformularDaten", (req, res) => {
    res.statusCode = 200;
    // sending the data to frontend as an array
    res.send(exampleTable);
  });

  app.get("/Anfragen", auth, (req, res) => {
    res.sendFile(__dirname + "/views/Anfragen.html");
  });

  app.get("/Impressum", (req, res) => {
    res.sendFile(__dirname + "/views/Impressum.html");
  });

  app.get("/Datenschutz", (req, res) => {
    res.sendFile(__dirname + "/views/Datenschutzerklärung.html");
  });

  // API Middleware
  app.use(express.json()); // accepting data in json

  // Listen for form PUSH html response and use data to send whatsapp message
  app.post("/KontaktformularDaten", async (req, res) => {
    const {} = req.headers;
    const { l_firstname, l_lastname, l_mail, l_tel, l_b_date, l_message } =
      req.body;

    exampleArray = [
      l_firstname,
      l_lastname,
      l_mail,
      l_tel,
      l_b_date,
      l_message,
    ];

    exampleTable.unshift(exampleArray);

    await db.createContactRequest(req.body);

    // Debugging Code for html push
    // console.log('Here is the data in Backend:')
    /*     console.log(req.body) */

    /* Send Message to a number */
    // console.log('Sending Whatsapp Message') // Debugging Code
    /*     SendWaMessage(req.body) */

    /* Send Mail to a number */
    //console.log("Sending Whatsapp Message"); // Debugging Code
    SendMail(req.body);
  });
}

module.exports = app;
