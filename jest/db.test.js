// Import statement
const db = require('../db/db');

// Testvariable declaration
const firstname = 'Max';
const lastname = 'Mustermann';
const mail = 'Max.Mustermann@web.de';
const tel = '0594 8749 49499';
const beginDate = '01.08.2022';
const message = 'Jest Test';


// First Test
test('Database: Initialized successfully with 2 test entries', async () => {
  // Resetting before Test
  await db.initialize();

  // await console.log(db.getContactRequests()); // Debugging Code
  const contactRequests = await db.getContactRequests();

  expect(contactRequests[0].message).toBe(
      'Dieser Satz wurde beim Initialen Aufruf der Datenbank erzeugt.',
  );
  expect(contactRequests[1].message).toBe(
      'Dieser Satz wurde auch beim Initialen Aufruf der Datenbank erzeugt.',
  );
});


// Second Test
test('Database: Contact insertion and retrieval of last entry', async () => {
  // Resetting before Test
  await db.initialize();

  // Getting the return object of the cuntion
  let contactRequest = await db.createContactRequest(
      firstname,
      lastname,
      mail,
      tel,
      beginDate,
      message,
  );

  // Testing the return object of the function
  expect(contactRequest.firstname).toBe('Max');
  expect(contactRequest.lastname).toBe('Mustermann');
  expect(contactRequest.mail).toBe('Max.Mustermann@web.de');
  expect(contactRequest.tel).toBe('0594 8749 49499');
  expect(contactRequest.beginDate).toBe('01.08.2022');
  expect(contactRequest.message).toBe('Jest Test');

  // Getting the object of the database
  contactRequest = await db.getLastContactRequest();

  // Testing the object in the database
  expect(contactRequest.firstname).toBe('Max');
  expect(contactRequest.lastname).toBe('Mustermann');
  expect(contactRequest.mail).toBe('Max.Mustermann@web.de');
  expect(contactRequest.tel).toBe('0594 8749 49499');
  expect(contactRequest.beginDate).toBe('01.08.2022');
  expect(contactRequest.message).toBe('Jest Test');

  // Resetting for next test
  await db.initialize();
});


// Third test
test('Database operations: Contact deletion', async () => {
  // Resetting before Test
  await db.initialize();

  // Deletion
  await db.deleteContactRequests();
  const contactRequest = await db.getContactRequests();

  expect(contactRequest).toBeUndefined();
});
