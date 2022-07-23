const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    fs.readFile('index.html', function (error, data) {
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


