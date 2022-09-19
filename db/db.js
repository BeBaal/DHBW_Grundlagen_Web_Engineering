const { JsonDB } = require("node-json-db");
const { Config } = require("node-json-db/dist/lib/JsonDBConfig");

const { v4: uuidv4 } = require("uuid");

const db = new JsonDB(new Config("contactRequest", true, false, "/"));

exports.initialize = async () => {
  try {
    this.deleteContactRequests(); //Resetting Database if resetted create an example entry
    this.createContactRequest(
      "Erster",
      "Satz",
      "Blablabla@web.de",
      "012370123",
      "",
      "Dieser Satz wurde beim Initialen Aufruf der Datenbank erzeugt."
    );
    this.createContactRequest(
      "Zweiter",
      "Satz",
      "Blablabla@web.de",
      "012370123",
      "",
      "Dieser Satz wurde auch beim Initialen Aufruf der Datenbank erzeugt."
    );
    return "deletion was successful";
  } catch (error) {
    return;
  }
};

exports.createContactRequest = async (
  l_firstname,
  l_lastname,
  l_mail,
  l_tel,
  l_b_date,
  l_message
) => {
  const date = new Date();

  const contactRequest = {
    id: uuidv4(),
    l_firstname,
    l_lastname,
    l_mail,
    l_tel,
    l_b_date,
    l_message,
    created: date,
    updated: date,
  };

  await db.push("/contactRequests[]", contactRequest);

  return contactRequest;
};

exports.deleteContactRequests = async () => {
  try {
    await db.delete("/contactRequests");
    return "successfull deletion";
  } catch (error) {
    //console.error(error); // Keep for Debugging
    return;
  }
};

exports.getContactRequests = async () => {
  try {
    var ContactRequests = await db.getData("/contactRequests");
    //console.log(ContactRequests); // Keep for Debugging
    return ContactRequests;
  } catch (error) {
    //console.log(error); // Keep for Debugging
    return;
  }
};

exports.getLastContactRequest = async () => {
  try {
    var contactRequest = await db.getData("/contactRequests[-1]");
    return contactRequest;
  } catch (error) {
    //console.log(error); // Keep for Debugging
    return;
  }
};
