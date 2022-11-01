const {JsonDB} = require('node-json-db');
const {Config} = require('node-json-db/dist/lib/JsonDBConfig');

const {v4: uuidv4} = require('uuid');

const db = new JsonDB(new Config('contactRequest', true, false, '/'));


/**
    * This method initalizes the database
    * @returns
*/
exports.initialize = async () => {
  try {
    this.deleteContactRequests(); // Resetting Database if empty create example
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
    return 'deletion was successful';
  } catch (error) {
    console.error('Fehler beim Aufruf von db.initialize', error);
    return;
  }
};

/**
 *
 * @param {string} firstname
 * @param {string} lastname
 * @param {string} mail
 * @param {string} tel
 * @param {string} beginnDate
 * @param {string} message
 * @returns
 */
exports.createContactRequest = async (
    firstname,
    lastname,
    mail,
    tel,
    beginnDate,
    message,
) => {
  // Checks the input paramters again in backend for beeing not empty
  if (
    firstname == null &&
    lastname == null &&
    mail == null &&
    tel == null &&
    beginnDate == null &&
    message == null
  ) {
    // ToDo check more than not beeing empty
    console.log(
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

  const date = new Date();

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

  await db.push('/contactRequests[]', contactRequest);

  return contactRequest;
};


/**
 *
 * @returns
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
 *
 * @returns
 */
exports.getContactRequests = async () => {
  try {
    const ContactRequests = await db.getData('/contactRequests');
    // console.log(ContactRequests); // Keep for Debugging
    return ContactRequests;
  } catch (error) {
    // Negativ Test in Jest included
    // console.log("Fehler beim Aufruf von db.getContactRequest", error);
    return;
  }
};


/**
 *
 * @returns
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
