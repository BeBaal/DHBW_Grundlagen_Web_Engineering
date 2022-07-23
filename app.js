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
})

// Listen on Port
app.listen(port, () => console.info(`listening on port ${port}`))






const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
        console.log(JSON.stringify(row));
    }
    client.end();
});