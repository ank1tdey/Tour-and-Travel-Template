// Scroll progress bar
var bar = document.getElementById('bar');
window.addEventListener('scroll', function () {
  var h = document.documentElement.scrollHeight - innerHeight;
  bar.style.transform = 'scaleX(' + (h > 0 ? scrollY / h : 0) + ')';
});

// Fade-in on scroll
var io = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.card,.tile,.stats>div').forEach(function (el, i) {
  el.classList.add('rv');
  el.style.transitionDelay = (i % 4) * 0.1 + 's';
  io.observe(el);
});

// Count-up numbers
var so = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
    if (!e.isIntersecting) return;
    so.unobserve(e.target);
    var n = +e.target.dataset.n, t0 = performance.now();
    (function f(t) {
      var p = Math.min((t - t0) / 1500, 1), v = n * p;
      e.target.textContent = (n % 1 ? v.toFixed(1) : Math.round(v)) + (n > 100 ? '+' : '');
      if (p < 1) requestAnimationFrame(f);
    })(t0);
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-n]').forEach(function (b) { so.observe(b); });

// Mountains move with the mouse
var sc = document.getElementById('scene');
sc.addEventListener('pointermove', function (e) {
  var r = sc.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5;
  sc.querySelectorAll('[data-d]').forEach(function (g) {
    g.style.transform = 'translateX(' + x * g.dataset.d + 'px)';
  });
});
