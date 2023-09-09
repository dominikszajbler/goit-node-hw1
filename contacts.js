const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const listContacts = () => {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error("Błąd odczytu pliku contacts.json:", err);
      return;
    }
    const contacts = JSON.parse(data);
    console.log("Lista kontaktów:");
    console.table(contacts);
  });
};
const getContactById = (contactId) => {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error("Błąd odczytu pliku contacts.json:", err);
      return;
    }
    const contacts = JSON.parse(data);
    const contact = contacts.find((c) => c.id === contactId);

    if (!contact) {
      console.log("Kontakt o podanym ID nie został znaleziony.");
      return;
    }

    console.log("Szukany kontakt:");
    console.table(contact);
  });
};

const removeContact = (contactId) => {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error("Błąd odczytu pliku contacts.json:", err);
      return;
    }
    const contacts = JSON.parse(data);
    const contactIndex = contacts.findIndex((c) => c.id === contactId);

    if (contactIndex === -1) {
      console.log("Kontakt o podanym ID nie został znaleziony.");
      return;
    }

    const removedContact = contacts.splice(contactIndex, 1)[0];

    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (err) => {
      if (err) {
        console.error("Błąd zapisu pliku contacts.json:", err);
        return;
      }
      console.log("Kontakt został usunięty:");
      console.table(removedContact);
    });
  });
};

const addContact = (name, email, phone) => {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error("Błąd odczytu pliku contacts.json:", err);
      return;
    }
    const contacts = JSON.parse(data);
    const newContact = { name, email, phone };
    contacts.push(newContact);

    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (err) => {
      if (err) {
        console.error("Błąd zapisu pliku contacts.json:", err);
        return;
      }
      console.log("Kontakt został dodany:");
      console.log(newContact);
    });
  });
};

module.exports = { listContacts, getContactById, removeContact, addContact };
