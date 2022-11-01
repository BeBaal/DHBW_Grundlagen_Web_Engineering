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
      // console.log(data); // Debugging Code

        for (const element of data) {
          contactArray = element;
          // Call addRow() with the table's ID
          addRow('myTable');
        }
      });
});

/**
 * Adds a row to the html page.
 * @param {string} tableID ID of the table where the row should be added.
 */
function addRow(tableID) {
  // Get a reference to the table
  const tableRef = document.getElementById(tableID);

  // Insert a row at the end of the table
  const newRow = tableRef.insertRow(-1);

  for (const element of contactArray) {
    // Insert a cell in the row
    const newCell = newRow.insertCell();

    // Append a text node to the cell
    const newText = document.createTextNode(element);
    newCell.appendChild(newText);
  }
}

preventDefault();
