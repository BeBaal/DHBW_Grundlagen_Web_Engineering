/* 
    Diese Java Skript ließt die Daten aus dem HTML Form aus und überträgt die Daten zur Datenbank.
    Falls die Eingabe korrekt oder falsch war, wird dem Anwender eine entsprechende Meldung als HMTL Objekt angezeigt.
    Zusätzlich findet die Übergabe der Daten vom Frontend an das Backend statt.
*/

/* Do this when page is loaded */
window.addEventListener('load', function () {
    /* Do this when Absenden Button is pushed */
    document.getElementById("myBtn2").addEventListener("click", validateData);


    /*  */
    function validateData() {
        let l_firstname = document.getElementById("firstname").value
        let l_lastname = document.getElementById("lastname").value
        let l_mail = document.getElementById("mail").value
        let l_tel = document.getElementById("tel").value
        let l_b_date = document.getElementById("b_date").value
        let l_message = document.getElementById("message").value
        let l_confirmation = document.getElementById("confirmation").value


        if (
            /* Check if empty / Redundancy and opportunity for performance improvement */
            l_firstname != null &&
            l_lastname != null &&
            l_mail != null &&
            l_tel != null &&
            l_b_date != null &&
            l_message != null &&
            l_confirmation == "true" &&

            /* Using the validation of the html form for a proof of the data */
            document.getElementById("firstname").checkValidity() &&
            document.getElementById("lastname").checkValidity() &&
            document.getElementById("mail").checkValidity() &&
            document.getElementById("tel").checkValidity() &&
            document.getElementById("b_date").checkValidity() &&
            document.getElementById("message").checkValidity() &&
            document.getElementById("confirmation").checkValidity()
        ) {
            /* Message for successful data entry */
            let notify = document.getElementById("success");
            notify.innerHTML = "Vielen Dank für die Eingabe Ihrer Anfrage. Wir kontaktieren Sie in Kürze.";
            notify.style.display = "block";

            // Debugging Code
            /* console.log(l_firstname)
            console.log(l_lastname)
            console.log(l_mail)
            console.log(l_tel)
            console.log(l_b_date)
            console.log(l_message)
            console.log(l_confirmation) */


            // sending the data to backend
            fetch('/KontaktformularDaten', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    l_firstname,
                    l_lastname,
                    l_mail,
                    l_tel,
                    l_b_date,
                    l_message
                }),
            })


        } else {
            /* message for unsuccessful data entry */
            let notify = document.getElementById("err");
            notify.innerHTML = "Bitte kontrollieren Sie Ihre Eingabe. Die rot markierten Felder müssen angepasst werden und das Textfeld darf nicht leer sein.";
            notify.style.display = "block";
        }
    }
})

