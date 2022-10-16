/*
    Diese Java Skript ließt die Daten aus dem HTML Form aus und überträgt die
    Daten zur Datenbank. Falls die Eingabe korrekt oder falsch war, wird dem
    Anwender eine entsprechende Meldung als HMTL Objekt angezeigt. Zusätzlich
    findet die Übergabe der Daten vom Frontend an das Backend statt.
*/

/* Do this when page is loaded */
window.addEventListener('load', function() {
  /* Do this when Absenden Button is pushed */
  document.getElementById('myBtn2').addEventListener('click', function() {
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const mail = document.getElementById('mail').value;
    const tel = document.getElementById('tel').value;
    const beginDate = document.getElementById('b_date').value;
    const message = document.getElementById('message').value;
    validateData(firstname, lastname, mail, tel, beginDate, message);
  });

  /**
   * This function validates the input variables
   * @param {string} firstname
   * @param {string} lastname
   * @param {string} mail
   * @param {string} tel
   * @param {string} beginDate
   * @param {string} message
   */
  function validateData(
      firstname,
      lastname,
      mail,
      tel,
      beginDate,
      message,
  ) {
    const confirmation = document.getElementById('confirmation').value;

    if (
      // Check if empty and valid
      firstname != null &&
      lastname != null &&
      mail != null &&
      tel != null &&
      beginDate != null &&
      message != null &&
      confirmation == 'true' &&
      /* Using the validation of the html form for a proof of the data */
      document.getElementById('firstname').checkValidity() &&
      document.getElementById('lastname').checkValidity() &&
      document.getElementById('mail').checkValidity() &&
      document.getElementById('tel').checkValidity() &&
      document.getElementById('b_date').checkValidity() &&
      document.getElementById('message').checkValidity() &&
      document.getElementById('confirmation').checkValidity()
    ) {
      /* Message for successful data entry */
      const notify = document.getElementById('success');
      notify.innerHTML =
      'Vielen Dank für Ihre Anfrage. Wir kontaktieren Sie in Kürze.';
      notify.style.display = 'block';

      // Debugging Code
      /* console.log(firstname)
            console.log(lastname)
            console.log(mail)
            console.log(tel)
            console.log(b_date)
            console.log(message)
            console.log(confirmation) */

      // sending the data to backend
      fetch('/KontaktformularDaten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname,
          lastname,
          mail,
          tel,
          b_date: beginDate,
          message,
        }),
      });
    } else {
      /* message for unsuccessful data entry */
      const notify = document.getElementById('err');
      notify.innerHTML =
        'Bitte kontrollieren Sie Ihre Eingabe. Die rot markierten Felder' +
        'müssen angepasst werden und das Textfeld darf nicht leer sein.';
      notify.style.display = 'block';
    }
  }
});
