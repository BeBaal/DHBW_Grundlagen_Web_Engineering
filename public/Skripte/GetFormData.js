/*
    Dieses Skript ist auf der Seite Kontaktformular.html verbaut. Es werden die
    Daten aus dem HTML-Form ausgelesen. Falls die Eingabe korrekt oder falsch
    war, wird dem Anwender eine entsprechende Meldung als HMTL-Objekt
    angezeigt. Zusätzlich findet die Übergabe der Daten vom Frontend an das
    Backend statt.
*/

/* Do this when page is loaded */
window.addEventListener('hashchange', function() {
  /* Do this when Absenden Button is pushed */
  document.getElementById('myBtn2').addEventListener('click', function() {
    console.log('Button was clicked');
    // Get values from innerHTML
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

    // Resett error and success message
    let notifySuccess = document.getElementById('err');
    notifySuccess.innerHTML = '';
    notifySuccess.style.display = 'none';
    let notifyError = document.getElementById('success');
    notifyError.innerHTML = '';
    notifyError.style.display = 'none';

    // Check if empty and valid
    isInputValid = (
      firstname != null &&
      lastname != null &&
      mail != null &&
      tel != null &&
      beginDate != null &&
      message != null &&
      confirmation == 'true' &&
      /* Using the validation of the html form for checking the data.
         This code probably double checks emptiness */
      document.getElementById('firstname').checkValidity() &&
      document.getElementById('lastname').checkValidity() &&
      document.getElementById('mail').checkValidity() &&
      document.getElementById('tel').checkValidity() &&
      document.getElementById('b_date').checkValidity() &&
      document.getElementById('message').checkValidity() &&
      document.getElementById('confirmation').checkValidity());


    if (isInputValid) {
      /* Message for successful data entry */
      notifySuccess = document.getElementById('success');
      notifySuccess.innerHTML =
      'Vielen Dank für Ihre Anfrage. Wir kontaktieren Sie in Kürze.';
      notifySuccess.style.display = 'block';

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
          beginDate,
          message,
        }),
      });
    } else {
      /* message for unsuccessful data entry */
      notifyError = document.getElementById('err');
      notifyError.innerHTML =
        'Bitte kontrollieren Sie Ihre Eingabe. Die rot markierten Felder' +
        'müssen angepasst werden und das Textfeld darf nicht leer sein.';
      notifyError.style.display = 'block';
    }
  }
}, {once: true});
