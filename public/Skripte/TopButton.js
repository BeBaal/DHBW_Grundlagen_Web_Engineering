/*
    Dieses Java Skript ist eingebaut auf allen HTHML Seiten und
    kontrolliert den Top Button. Nachdem im Dokument heruntergescrollt wird
    erscheint ein Button, der einen wieder zum Beginn des Dokuments bringt.
*/

window.addEventListener('load', function() {
  // Get reference to the button
  const mybutton = document.getElementById('myBtn');

  // On scroll call the below function which checks how much was scrolled
  window.onscroll = function() {
    scrollFunction();
  };

  /**
   * When the user scrolls down 20px from the top of the document,
   * show the button
   */
  function scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      mybutton.style.display = 'block';
    } else {
      mybutton.style.display = 'none';
    }
  }

  // When the user clicks on the button call topFunction
  document.getElementById('myBtn').addEventListener('click', topFunction);

  /**
   * Jump to the top of the document
   */
  function topFunction() {
    document.body.scrollTop = 0; // Options for different browsers
    document.documentElement.scrollTop = 0; // Options for different browsers
  }
});
