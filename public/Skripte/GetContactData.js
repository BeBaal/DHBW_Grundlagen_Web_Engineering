/* 
    Dieses Skript weist die aktuellen Kontaktanfragen in einer Tabelle aus.
*/

window.addEventListener("load", function () {
  // Get a reference to the table
  let tableRef = document.getElementById("myTable");

  // getting the data from backend
  fetch("/KontaktformularDaten")
    .then((response) => response.json())
    .then((data) => {
      //console.log(data); // Debugging Code

      for (const element of data) {
        contactArray = element;
        // Call addRow() with the table's ID
        addRow("myTable");
      }
    });
});

/**
 * Adds a row to the html page.
 * @param {string} tableID ID of the table where the row should be added.
 */
function addRow(tableID) {
  // Get a reference to the table
  let tableRef = document.getElementById(tableID);

  // Insert a row at the end of the table
  let newRow = tableRef.insertRow(-1);

  for (const element of contactArray) {
    // Insert a cell in the row
    let newCell = newRow.insertCell();

    // Append a text node to the cell
    let newText = document.createTextNode(element);
    newCell.appendChild(newText);
  }
}

preventDefault();
