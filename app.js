// Imports
const http = require('http');
const fs = require('fs');
const express = require('express')
const app = express()

// Definition of Port (first argument for port is for heroku and second for local deployment) and hostname
const hostname = '127.0.0.1';
const port = process.env.PORT || 5000;

// Static Files Port
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/Skripte', express.static(__dirname + 'public/Skripte'))
app.use('/img', express.static(__dirname + 'public/img'))


app.get('', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
    res.sendFile(__dirname + '/views/Fotos')
    res.sendFile(__dirname + '/views/Fotos')
})

// Listen on Port
app.listen(port, () => console.info(`listening on port ${port}`))









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

// 
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