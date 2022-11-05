/* eslint-disable no-unused-vars */
// Dieses Skript wird in der index.html aufgerufen und nicht hier.
/* eslint-disable prefer-const */
// Skript wirft Error, wenn allHTMLelements als Konstante gesetzt wird.

/**
 * Dieses Skript macht aus den vielen HTML files eine einzelne Datei.
 * In der Mitte der Seite wird der Content aus html files nachgelesen,
 * diese Files werden beim initialen Aufruf der Einstiegseite geladen.
 *
 * @async
 */
function includeHTML() {
  let allHTMLelements;
  let countHTMLelements;
  let HTMLelement;
  let file;
  let xhttp;

  /* Loop through a collection of all HTML elements: */
  allHTMLelements = document.getElementsByTagName('*');
  for (countHTMLelements = 0;
    countHTMLelements < allHTMLelements.length;
    countHTMLelements++) {
    HTMLelement = allHTMLelements[countHTMLelements];
    /* Sucht nach HTML Element mit Attribut include-html*/
    file = HTMLelement.getAttribute('include-html');

    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {
            // Nimmt die response und ändert den container auf index Seite
            HTMLelement.innerHTML = this.responseText;
          }

          if (this.status == 404) {
            HTMLelement.innerHTML = 'Page not found.';
          }
          /* Remove the attribute, and call this function once more: */
          HTMLelement.removeAttribute('include-html');
          includeHTML();
        }
      };
      xhttp.open('GET', file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}
