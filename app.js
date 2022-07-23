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





/* const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    fs.readFile('public/html/index.html', function (error, data) {
        if (error) {
            res.writeHead(404)
            res.write('Error: File Not Found')
        } else {
            res.write(data)
        }

        res.write('Hello Node')
        res.end('Hello World');
    })
});

server.listen(port, hostname, (error) => {

    if (error) {
        console.log('Server ist nicht gestartet.', error)
    } else {
        console.log(`Server running at http://${hostname}:${port}/`);
    }
});


 */