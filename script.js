// 1. Las estrellas de la trayectoria se encienden una a una al llegar a ella.
(function () {
  var nodos = Array.prototype.slice.call(document.querySelectorAll('.nodo'));
  var linea = document.querySelector('.linea');
  if (!nodos.length || !linea) return;

  var reducir = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function encender() {
    nodos.forEach(function (n, i) {
      if (reducir) { n.classList.add('is-lit'); return; }
      setTimeout(function () { n.classList.add('is-lit'); }, i * 320);
    });
  }

  if (!('IntersectionObserver' in window)) { encender(); return; }
  var obs = new IntersectionObserver(function (entradas) {
    if (entradas[0].isIntersecting) { encender(); obs.disconnect(); }
  }, { threshold: 0.2 });
  obs.observe(linea);
})();

// 2. Reproductores de YouTube: la página muestra una imagen y solo carga
// el reproductor cuando alguien lo pide. Así la página abre rápido y todos
// los videos mantienen la misma proporción 16:9.
(function () {
  document.querySelectorAll('.video__boton').forEach(function (boton) {
    boton.addEventListener('click', function () {
      var id = boton.getAttribute('data-yt');
      if (!id) return;
      var inicio = boton.getAttribute('data-inicio');
      var src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) +
        '?autoplay=1&rel=0' + (inicio ? '&start=' + encodeURIComponent(inicio) : '');

      var marco = document.createElement('iframe');
      marco.src = src;
      marco.title = boton.getAttribute('data-titulo') || 'Video de YouTube';
      marco.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      marco.setAttribute('allowfullscreen', '');
      marco.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');

      boton.replaceWith(marco);
    });
  });
})();
