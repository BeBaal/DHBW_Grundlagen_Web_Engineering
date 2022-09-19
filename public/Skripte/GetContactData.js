/* 
    Dieses Skript weist die aktuellen Kontaktanfragen in einer Tabelle aus.
*/

window.addEventListener("load", function () {
  // Initialisiere leere Objekte
  /*     const l_firstname = ""
        const l_lastname = ""
        const l_mail = ""
        const l_tel = ""
        const l_b_date = ""
        const l_message = ""
        let exampleRow = [l_firstname, l_lastname, l_mail, l_tel, l_b_date, l_message] */

  function addRow(tableID) {
    // Get a reference to the table
    let tableRef = document.getElementById(tableID);

    // Insert a row at the end of the table
    let newRow = tableRef.insertRow(-1);

    for (const element of exampleRow) {
      // Insert a cell in the row at index 0
      let newCell = newRow.insertCell();

      // Append a text node to the cell
      let newText = document.createTextNode(element);
      newCell.appendChild(newText);
    }
  }

  // getting the data from backend
  fetch("/KontaktformularDaten")
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // Debugging Code

      for (const element of data) {
        exampleRow = element;
        // Call addRow() with the table's ID
        addRow("myTable");
      }
    });
});
