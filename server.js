/**
 * This Javascript handles the server functionality of this application. The
 * app and server are separated due to testing purposes for the jest tests.
 */

// Import statements
const app = require('./app');

// Declaration
// Definition of Port (first parameter for port is for heroku and second
// for local deployment) and hostname
// const hostname = '127.0.0.1';
const port = process.env.PORT || 5000;

// Listen on Port
app.listen(port, () => console.info(`listening on port ${port}`));
