/**
 * Diese Skript macht aus der vorherigen Multipage Application eine Single Page
 * Application. Das Skript blendet verschiedene Container mit html content auf
 * der index Seite ein.
 */


/**
 * Hash aus der URL holen und # durch nichts ersetzten ("#home" -> "home")
 */
function onHashChange() {
  const h = window.location.hash.replace('#', '');

  // Auf der Console ausgeben, dass sich der Hash verändert hat
  console.info('hashchange', h);

  // Das sind die verschiedenen Container, die auf der index Seite eingeblendet
  // werden können.
  const nav =
  ['Startseite',
    'FAQ',
    'Fotos',
    'Kontaktformular',
    'Impressum',
    'Datenschutz'];

  // Über alle Teilbereiche iterieren
  for (let i = 0; i < nav.length; i++) {
    // Element mit diesem Namen aus dem DOM fischen
    const element = document.getElementById(nav[i]);

    if (nav[i] == h) { // Aktueller Hash ist der Teilbereich -> anzeigen
      element.classList.remove('hidden');
    } else { // Aktueller Hash ist NICHT der Teilbereich -> verstecken
      element.classList.add('hidden');
    }
  }

  // Wenn kein Hash in der URL ist, dann zeigen wir Home an
  if (h == '') {
    document.getElementById('Startseite').classList.remove('hidden');
  }
}


// Funktion aufrufen wenn Webseite vollständig geladen wurde
window.addEventListener('load', function() {
  console.info('Website geladen');

  // Ruft die Funktion auf die die html container lädt.
  includeHTML();

  // Funktionsaufruf bei Change des Hashs in der URL
  window.addEventListener('hashchange', onHashChange);

  // Beim ersten Laden der Seite die Startseite zeigen
  onHashChange();
});
