/* 
    Diese Java Skript ließt die Daten aus dem HTML Form aus und überträgt die Daten zur Datenbank.
*/

window.addEventListener('load', function () {
    document
        .getElementById("myBtn2")
        .addEventListener("click", dataPush);


    function dataPush() {
        let l_firstname = document.getElementById("firstname")
        let l_lastname = document.getElementById("lastname")
        let l_mail = document.getElementById("mail")
        let l_tel = document.getElementById("tel")
        let l_b_date = document.getElementById("b_date")
        let l_message = document.getElementById("message")
        let l_confirmation = document.getElementById("confirmation")

        console.log(l_firstname.value)

    }
})

