// Imports
const express = require("express");
const app = express();

/* Debugging Deklaration */
/* const l_firstname = "Bernd"
const l_lastname = "Baalmann"
const l_mail = "Bernd.Baalmann@web.de"
const l_tel = "0594 8749 49499"
const l_b_date = "01.08.2022"
const l_message = "Hat seine Freundin ganz doll lieb!"
const l_confirmation = true */

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

/* Send Whatsapp Message functionality */
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
      args: ["--no-sandbox"],
    },
  });

  client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
  });

  client.on("ready", () => {
    //console.log('Client is ready!'); // Debugging Client creation

    // Number or group where you want to send the message.
    const number = "+4917643517790";
    const waGroup = "proWIN Familiengruppe";

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

function SendMail(l_firstname, l_lastname, l_mail, l_tel, l_b_date, l_message) {
  // using Twilio SendGrid's v3 Node.js Library
  // https://github.com/sendgrid/sendgrid-nodejs

  //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

  const sgMail = require("@sendgrid/mail");
  //console.log(process.env.SENDGRID_API_KEY);
  sgMail.setApiKey(
    "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"
  );
  // Your message.
  const text =
    "Es gab für den " +
    l_b_date +
    "<br> eine neue Anfrage auf der Mietgaragenwebsite von " +
    l_firstname +
    "<br>  " +
    l_lastname +
    "<br>  unter der Nummer: " +
    l_tel +
    "<br>  / Email: " +
    l_mail +
    "<br>  mit der folgenden Nachricht: " +
    l_message;
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

// Webserver Part

// Definition of Port (first parameter for port is for heroku and second for local deployment) and hostname
const hostname = "127.0.0.1";
const port = process.env.PORT || 5000;

// Static Files Port
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/Skripte", express.static(__dirname + "public/Skripte"));
app.use("/img", express.static(__dirname + "public/img"));

// Listen on Port
app.listen(port, () => console.info(`listening on port ${port}`));

// Requests from Client will be responded with these HTML pages
app.get("/", (req, res) => {
  res.statusCode = 200;
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/index", (req, res) => {
  res.statusCode = 200;
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/FAQ", (req, res) => {
  res.statusCode = 200;
  res.sendFile(__dirname + "/views/FAQ.html");
});

app.get("/Fotos", (req, res) => {
  res.statusCode = 200;
  res.sendFile(__dirname + "/views/Fotos.html");
});

app.get("/Kontaktformular", (req, res) => {
  res.statusCode = 200;
  res.sendFile(__dirname + "/views/Kontaktformular.html");
});

app.get("/KontaktformularDaten", (req, res) => {
  res.statusCode = 200;
  // sending the data to frontend as an array
  res.send(exampleTable);
});

app.get("/Anfragen", (req, res) => {
  res.statusCode = 200;
  res.sendFile(__dirname + "/views/Anfragen.html");
});

app.get("/Impressum", (req, res) => {
  res.statusCode = 200;
  res.sendFile(__dirname + "/views/Impressum.html");
});

app.get("/Datenschutz", (req, res) => {
  res.statusCode = 200;
  res.sendFile(__dirname + "/views/Datenschutzerklärung.html");
});

// API Middleware
app.use(express.json()); // accepting data in json

// Listen for form PUSH html response and use data to send whatsapp message
app.post("/KontaktformularDaten", (req, res) => {
  const {} = req.headers;
  const { l_firstname, l_lastname, l_mail, l_tel, l_b_date, l_message } =
    req.body;

  exampleArray = [l_firstname, l_lastname, l_mail, l_tel, l_b_date, l_message];

  exampleTable.unshift(exampleArray);

  // Debugging Code for html push
  // console.log('Here is the data in Backend:')
  /*     console.log(
            l_firstname,
            l_lastname,
            l_mail,
            l_tel,
            l_b_date,
            l_message) */

  /* Send Message to a number */
  // console.log('Sending Whatsapp Message') // Debugging Code
  /*     SendWaMessage(
            l_firstname,T
            l_lastname,
            l_mail,
            l_tel,
            l_b_date,
            l_message) */

  /* Send Mail to a number */
  //console.log("Sending Whatsapp Message"); // Debugging Code
  //SendMail(l_firstname, l_lastname, l_mail, l_tel, l_b_date, l_message);
});

// Hier könnte noch eine Datenbank angelegt werden
