// Animated stat counter — runs once when stats strip enters the viewport.
(function () {
  const nums = document.querySelectorAll('.stat-num');
  if (!nums.length) return;

  const animate = (el) => {
    const target = parseInt(el.dataset.target || '0', 10);
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.floor(eased * target).toString();
      if (t < 1) requestAnimationFrame(step);
      else el.textContent = target.toString();
    };
    requestAnimationFrame(step);
  };

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animate(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  nums.forEach((n) => obs.observe(n));
})();

// Smooth scroll padding offset for sticky nav (handled in CSS via scroll-behavior).
