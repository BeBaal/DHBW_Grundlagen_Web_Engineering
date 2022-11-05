/* eslint-disable no-unused-vars */
// Die beiden Funktionen werden in der HTHML Page aufgerufen, daher wirft
// ESlint sonst hier eine Warnung.

/*
    Dieses Java Skript ist eingebaut auf der HTHML Seite Fotos.html und
    kontrolliert die Slideshow.
*/

// Start with slide 1
let slideIndex = 1;

// on hash change call function and reset slide show
window.addEventListener('hashchange', function() {
  const slideIndex = 1;
  showSlides(slideIndex);
});


/**
 * Führt die vor und zurück Funktionalität der beiden Buttons aus.
 * @param {integer} n Je nach Vor oder zurück drücken -1 oder 1
 */
function plusSlides(n) {
  showSlides((slideIndex += n));
}


/**
 * Steuert die fünf Radio buttons zur Auswahl der aktuellen Slide aus.
 * @param {integer} n Wert ist 1:5
 */
function currentSlide(n) {
  showSlides((slideIndex = n));
}


/**
 * Wird von den beiden oberen Funktionen aufgerufen und stellt das Slide sowie
 * den Button um.
 * @param {integer} n Die Slide die gezeigt werden soll.
 */
function showSlides(n) {
  let i;
  const slides = document.getElementsByClassName('mySlides');
  const dots = document.getElementsByClassName('dot');

  // Wenn alle Slides durchgeklickt sind gehe zum Anfang
  if (n > slides.length) {
    slideIndex = 1;
  }

  // Wenn auf der ersten Slide nach links gedrückt wird gehe auf die letzte.
  if (n < 1) {
    slideIndex = slides.length;
  }

  // Stelle alle Slides auf nicht sichtbar
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }

  // Markiere den Dot für die aktuelle Slide
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(' active', '');
  }

  // Stelle dot und Slide auf aktiv
  slides[slideIndex - 1].style.display = 'block';
  dots[slideIndex - 1].className += ' active';
}
