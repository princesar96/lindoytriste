// 0. La barra se oscurece al bajar de la portada.
(function () {
  var barra = document.querySelector('.barra');
  if (!barra) return;
  function ajustar() { barra.classList.toggle('is-solida', window.scrollY > 40); }
  window.addEventListener('scroll', ajustar, { passive: true });
  ajustar();
})();

// 1. Menú en pantallas pequeñas.
(function () {
  var boton = document.querySelector('.barra__boton');
  var menu = document.getElementById('menu');
  if (!boton || !menu) return;

  function cerrar() {
    menu.classList.remove('is-open');
    boton.setAttribute('aria-expanded', 'false');
  }
  boton.addEventListener('click', function () {
    var abierto = menu.classList.toggle('is-open');
    boton.setAttribute('aria-expanded', abierto ? 'true' : 'false');
  });
  menu.addEventListener('click', function (e) { if (e.target.tagName === 'A') cerrar(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') cerrar(); });
})();

// Barra: transparente sobre la portada, sólida al bajar.
(function () {
  var barra = document.querySelector('.barra');
  if (!barra) return;
  function marcar() { barra.classList.toggle('is-solida', window.scrollY > window.innerHeight * 0.6); }
  window.addEventListener('scroll', marcar, { passive: true });
  marcar();
})();

// 2. Las estrellas de la historia se encienden una a una al llegar a ellas.
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

// 3. Reproductores de YouTube: se muestra una imagen y el reproductor solo
// se carga al hacer clic, así la página abre rápido y todos mantienen 16:9.
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

// 4. Galerías: al tocar una foto se agranda; flechas y Esc para moverse dentro de su grupo.
(function () {
  var visor = document.querySelector('.visor');
  var todas = Array.prototype.slice.call(document.querySelectorAll('.galeria__foto'));
  if (!visor || !todas.length) return;
  var img = visor.querySelector('img');
  var pie = visor.querySelector('figcaption');
  var fotos = todas, actual = 0, origen = null;

  function mostrar(i) {
    actual = (i + fotos.length) % fotos.length;
    var f = fotos[actual];
    img.src = f.getAttribute('data-grande');
    img.alt = f.querySelector('img').alt;
    pie.textContent = f.getAttribute('data-texto') || '';
  }
  todas.forEach(function (f) {
    f.addEventListener('click', function () {
      var g = f.getAttribute('data-grupo');
      fotos = todas.filter(function (x) { return x.getAttribute('data-grupo') === g; });
      origen = f; mostrar(fotos.indexOf(f));
      if (visor.showModal) visor.showModal(); else visor.setAttribute('open', '');
    });
  });
  function cerrar() { if (visor.close) visor.close(); else visor.removeAttribute('open'); if (origen) origen.focus(); }
  visor.querySelector('.visor__cerrar').addEventListener('click', cerrar);
  visor.querySelector('.visor__nav--ant').addEventListener('click', function () { mostrar(actual - 1); });
  visor.querySelector('.visor__nav--sig').addEventListener('click', function () { mostrar(actual + 1); });
  visor.addEventListener('click', function (e) { if (e.target === visor) cerrar(); });
  visor.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') mostrar(actual - 1);
    if (e.key === 'ArrowRight') mostrar(actual + 1);
  });
})();
