/* 
    Diese Java Skript ließt die Daten aus dem HTML Form aus und überträgt die Daten zur Datenbank.
*/

window.addEventListener('load', function () {
    document.getElementById("myBtn2").addEventListener("click", dataPush);



    function dataPush() {
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

            /* Using the validation of the html for a proof of the data */
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
            notify.innerHTML = "Vielen Dank für die Eingabe Ihrer Kontaktinformationen. Wir schicken Ihnen eine Bestätigungsmail und kontaktieren Sie in Kürze.";
            notify.style.display = "block";

            /* Debugging Code */
            console.log(l_firstname)
            console.log(l_lastname)
            console.log(l_mail)
            console.log(l_tel)
            console.log(l_b_date)
            console.log(l_message)
            console.log(l_confirmation)
        } else {
            /* message for unsuccessful data entry */
            let notify = document.getElementById("err");
            notify.innerHTML = "Bitte kontrollieren Sie Ihre Eingabe. Die rot markierten Felder müssen angepasst werden und das Textfeld darf nicht leer sein.";
            notify.style.display = "block";

        }



    }
})

