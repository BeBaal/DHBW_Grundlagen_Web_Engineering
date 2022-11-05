/**
 * Dieses Skript regelt die Funktionsweise der Datenbank und wird von der
 * app.js aufgerufen.
 */

const {JsonDB} = require('node-json-db');
const {Config} = require('node-json-db/dist/lib/JsonDBConfig');
const {v4: uuidv4} = require('uuid');

const db = new JsonDB(new Config('contactRequest', true, false, '/'));


/**
    * This method initalizes the database with two test records
    * @async
    * @return {empty} empty return statement
*/
exports.initialize = async () => {
  // Läuft auf Fehler, wenn die Datenbank leer ist
  try {
    this.deleteContactRequests(); // Reset Database if empty create 2 records
    this.createContactRequest(
        'Erster',
        'Satz',
        'Blablabla@web.de',
        '012370123',
        '01.01.1000',
        'Dieser Satz wurde beim Initialen Aufruf der Datenbank erzeugt.',
    );
    this.createContactRequest(
        'Zweiter',
        'Satz',
        'Blablabla@web.de',
        '012370123',
        '01.01.1000',
        'Dieser Satz wurde auch beim Initialen Aufruf der Datenbank erzeugt.',
    );
    console.info('Initialization of database was successfull');
    return;
  } catch (error) {
    console.error('Error at call of db.initialize', error);
    return;
  }
};


/**
 * Diese Funktion erzeugt einen ContactRequest in der Datenbank.
 *
 * @async
 * @param {string} firstname
 * @param {string} lastname
 * @param {string} mail
 * @param {string} tel
 * @param {string} beginnDate
 * @param {string} message
 * @return {(empty|contactRequest)} returns either empty or contactRequest
 */
exports.createContactRequest = async (
    firstname,
    lastname,
    mail,
    tel,
    beginnDate,
    message,
) => {
  /** Prüft ob die Eingabeparameter nicht leer sind. Doppelte Prüfung sollte
   *  im Frontend schon sichergestellt sein.
  */
  if (
    firstname == null &&
    lastname == null &&
    mail == null &&
    tel == null &&
    beginnDate == null &&
    message == null
  ) {
    console.error(
        'Bitte Inputparameter beim Aufruf der Funktion db.createContactRequest'+
        'kontrollieren. Validation was not successfull.',
        firstname,
        lastname,
        mail,
        tel,
        beginnDate,
        message,
    );
    return;
  }

  // Aktuelles Datum generieren
  const date = new Date();

  // Create contactRequest object out of input parameters
  const contactRequest = {
    id: uuidv4(),
    firstname: firstname,
    lastname: lastname,
    mail: mail,
    tel: tel,
    beginnDate: beginnDate,
    message: message,
    created: date,
    updated: date,
  };

  // Push data to database
  await db.push('/contactRequests[]', contactRequest);

  return contactRequest;
};


/**
 * This function deletes all contactRequests
 *
 * @async
 * @return {(empty|string)} returns either empty or error message
 */
exports.deleteContactRequests = async () => {
  try {
    await db.delete('/contactRequests');
    return 'successfull deletion';
  } catch (error) {
    console.error('Fehler beim Aufruf von db.deleteContactRequests', error);
    return;
  }
};


/**
 * This function gets all contactRequests
 *
 * @async
 * @return {empty|contactRequest}
 */
exports.getContactRequests = async () => {
  try {
    const ContactRequests = await db.getData('/contactRequests');
    return ContactRequests;
  } catch (error) {
    return;
  }
};


/**
 * This function gets the last contactRequests and is not used
 *
 * @async
 * @return {empty|contactRequest}
 */
exports.getLastContactRequest = async () => {
  try {
    const contactRequest = await db.getData('/contactRequests[-1]');
    return contactRequest;
  } catch (error) {
    console.log('Fehler beim Aufruf von db.getLastContactRequest', error);
    return;
  }
};
