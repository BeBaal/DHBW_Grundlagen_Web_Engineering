/*
    Dieses Skript ist auf der Anfragen.html Seite verbaut und fragt vom Server
    die bisher eingegangenen Kontaktanfragen ab. Die Response wird auf der HMTL
    Page als weitere Zeilen in der Tabelle ausgegeben.
*/

window.addEventListener('load', function() {
  // getting the data from backend
  fetch('/KontaktformularDaten')
      .then((response) => response.json())
      .then((data) => {
        let lineNumber = 1;

        for (const row of data) {
          addRow('myTable', row, lineNumber);
          lineNumber++;
        }
      });
});

/**
 * Adds a row to the html table element.
 * @param {string} tableID ID of the table where the row should be added.
 * @param {array} array row that will be added to the table
 * @param {int} lineNumber which line should the row be added
 *
 */
function addRow(tableID, array, lineNumber) {
  // Get a reference to the table
  const tableRef = document.getElementById(tableID);

  // Insert a row at the end of the table
  const newRow = tableRef.insertRow(lineNumber);

  for (const element of array) {
    // Insert a cell in the row
    const newCell = newRow.insertCell();

    // Append a text node to the cell
    const newText = document.createTextNode(element);
    newCell.appendChild(newText);
  }
}
