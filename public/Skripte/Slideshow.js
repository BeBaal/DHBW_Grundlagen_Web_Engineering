/* eslint-disable no-unused-vars */
// Die beiden Funktionen werden in der HTHML Page aufgerufen, daher wirft
// ESlint sonst hier eine Warnung.

/*
    Dieses Java Skript ist eingebaut auf der HTHML Seite Fotos.html und
    kontrolliert die Slideshow.
*/

window.addEventListener('load', function() {
  const slideIndex = 1;
  showSlides(slideIndex);
});

let slideIndex = 1;
showSlides(slideIndex);

/**
 * Führt die vor und zurück Funktionalität der Buttons aus.
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

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(' active', '');
  }
  slides[slideIndex - 1].style.display = 'block';
  dots[slideIndex - 1].className += ' active';
}
