// Imports
const express = require('express')
const app = express()



/* Debugging Deklaration */
const l_firstname = "Bernd"
const l_lastname = "Baalmann"
const l_mail = "Bernd.Baalmann@web.de"
const l_tel = "0594 8749 49499"
const l_b_date = "01.08.2022"
const l_message = "Hat seine Freundin ganz doll lieb!"
const l_confirmation = true


/* const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
}) */


/* Send Whatsapp Message */
function SendWaMessage(l_firstname,
    l_lastname,
    l_mail,
    l_tel,
    l_b_date,
    l_message) {

    const qrcode = require('qrcode-terminal');

    const { Client, LocalAuth } = require('whatsapp-web.js');

    const client = new Client({
        authStrategy: new LocalAuth()
    });

    client.on('qr', qr => {
        qrcode.generate(qr, { small: true });
    });

    client.on('ready', () => {
        console.log('Client is ready!');


        // Number where you want to send the message.
        const number = "+4917643517790";

        // Your message.
        const text = "Es gab am " + l_b_date + " eine neue Anfrage auf der Mietgaragenwebsite von " + l_firstname + " " + l_lastname + " unter der Nummer: " + l_tel + " / Email: " + l_mail + " mit der folgenden Nachricht: " + l_message

        // Getting chatId from the number.
        // we have to delete "+" from the beginning and add "@c.us" at the end of the number.
        const chatId = number.substring(1) + "@c.us";

        // Sending message.
        client.sendMessage(chatId, text);
    });


    client.initialize();

}

/* Send Message */
/* SendWaMessage(l_firstname,
    l_lastname,
    l_mail,
    l_tel,
    l_b_date,
    l_message) */





// Webserver Part

// Definition of Port (first argument for port is for heroku and second for local deployment) and hostname
const hostname = '127.0.0.1';
const port = process.env.PORT || 5000;

// Static Files Port
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/Skripte', express.static(__dirname + 'public/Skripte'))
app.use('/img', express.static(__dirname + 'public/img'))


// Listen on Port
app.listen(port, () => console.info(`listening

on port ${port}`))


// Requests from Client will be solved with these HTML pages
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})

app.get('/index', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})

app.get('/FAQ', (req, res) => {
    res.sendFile(__dirname + '/views/FAQ.html')
})

app.get('/Fotos', (req, res) => {
    res.sendFile(__dirname + '/views/Fotos.html')
})

app.get('/Kontaktformular', (req, res) => {
    res.sendFile(__dirname + '/views/Kontaktformular.html')
})

app.get('/Impressum', (req, res) => {
    res.sendFile(__dirname + '/views/Impressum.html')
})

app.get('/Datenschutz', (req, res) => {
    res.sendFile(__dirname + '/views/Datenschutzerklärung.html')
})






















// Das hier muss noch ausgebaut werden


/* 




// Postgres Integration und benötigte Module
const { Client } = require('pg');

// Neuer Client zur Datenbank
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

// Aufbau Verbindung zur Datenbank
client.connect();


client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
        console.log(JSON.stringify(row));
    }
    client.end();
});


//Create Database Table 
client.query(`CREATE TABLE IF NOT EXISTS t_contact_form (firstname VARCHAR(20) NOT NULL,
                                                        lastname VARCHAR(20) NOT NULL,
                                                        mail VARCHAR(40) NOT NULL,
                                                        tel VARCHAR(20) NOT NULL,
                                                        b_date date NOT NULL,
                                                        message VARCHAR(100) NOT NULL,
                                                        confirmation boolean NOT NULL,
                                                        ); `, (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
        console.log(JSON.stringify(row));
    }
    client.end();
});
 */

/* 

client.query(`INSERT INTO t_contact_form VALUES 'Max',
                                                'Mustermann,
                                                'Max.Mustermann@web.de',
                                                '059541708',
                                                '20220712',
                                                'message',
                                                True,
                                                ); `, (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
        console.log(JSON.stringify(row));
    }
    client.end();
});

client.query('SELECT * FROM t_contact_form;', (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
        console.log(JSON.stringify(row));
    }
    client.end();
}); */