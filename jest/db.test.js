// Import statement
const db = require("../db/db");

// Testvariable declaration
const l_firstname = "Max";
const l_lastname = "Mustermann";
const l_mail = "Max.Mustermann@web.de";
const l_tel = "0594 8749 49499";
const l_b_date = "01.08.2022";
const l_message = "Jest Test";

// First Test
test("Database was initialized successfully with two test entries", async () => {
  await db.initialize();
  // await console.log(db.getContactRequests()); // Debugging Code
  var contactRequests = await db.getContactRequests();

  expect(contactRequests[0].l_message).toBe(
    "Dieser Satz wurde beim Initialen Aufruf der Datenbank erzeugt."
  );
  expect(contactRequests[1].l_message).toBe(
    "Dieser Satz wurde auch beim Initialen Aufruf der Datenbank erzeugt."
  );
});

// Second Test
test("Database operations: Contact insertion and retrieval of last entry", async () => {
  // Getting the return object of the cuntion
  var contactRequest = await db.createContactRequest(
    l_firstname,
    l_lastname,
    l_mail,
    l_tel,
    l_b_date,
    l_message
  );

  // Testing the return object of the function
  expect(contactRequest.l_firstname).toBe("Max");
  expect(contactRequest.l_lastname).toBe("Mustermann");
  expect(contactRequest.l_mail).toBe("Max.Mustermann@web.de");
  expect(contactRequest.l_tel).toBe("0594 8749 49499");
  expect(contactRequest.l_b_date).toBe("01.08.2022");
  expect(contactRequest.l_message).toBe("Jest Test");

  // Getting the object of the database
  contactRequest = await db.getLastContactRequest();

  // Testing the object in the database
  expect(contactRequest.l_firstname).toBe("Max");
  expect(contactRequest.l_lastname).toBe("Mustermann");
  expect(contactRequest.l_mail).toBe("Max.Mustermann@web.de");
  expect(contactRequest.l_tel).toBe("0594 8749 49499");
  expect(contactRequest.l_b_date).toBe("01.08.2022");
  expect(contactRequest.l_message).toBe("Jest Test");

  // Resetting for next test
  await db.initialize();
});

// Third test
test("Database operations: Contact deletion", async () => {
  await db.deleteContactRequests();
  var contactRequest = await db.getContactRequests();

  expect(contactRequest).toBeUndefined();
});
