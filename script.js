// Enciende las luces de la línea de tiempo, una a una, cuando llega a la pantalla.
(function () {
  var bulbs = Array.prototype.slice.call(document.querySelectorAll('.bulb'));
  if (!bulbs.length) return;

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function lightAll() {
    bulbs.forEach(function (b, i) {
      if (reduce) {
        b.classList.add('is-lit');
      } else {
        setTimeout(function () { b.classList.add('is-lit'); }, i * 380);
      }
    });
  }

  var timeline = document.querySelector('.timeline');
  if (!('IntersectionObserver' in window) || !timeline) {
    lightAll();
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) {
      lightAll();
      observer.disconnect();
    }
  }, { threshold: 0.25 });

  observer.observe(timeline);
})();
