(() => {
  const root = document.documentElement;
  const theme = document.querySelector('.theme-toggle');
  const dark = matchMedia('(prefers-color-scheme: dark)');
  theme.hidden = false;
  theme.addEventListener('click', () => {
    const current = root.dataset.theme || (dark.matches ? 'dark' : 'light');
    root.dataset.theme = current === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('jopefer-theme', root.dataset.theme); } catch {}
  });

  const scene = document.querySelector('.playground');
  const orb = scene.querySelector('.orb');
  const eyes = scene.querySelector('.eyes');
  const front = scene.querySelector('.orbit-front');
  const back = scene.querySelector('.orbit-back');
  const sparks = scene.querySelector('.sparkles');
  const toggle = scene.querySelector('.motion-toggle');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = false;
  let targetX = 0, targetY = 0, x = 0, y = 0, frame = 0;

  function reset() {
    cancelAnimationFrame(frame);
    frame = 0;
    x = y = targetX = targetY = 0;
    for (const part of [orb, eyes, front, back, sparks]) part.removeAttribute('transform');
  }
  function render() {
    x += (targetX - x) * .09;
    y += (targetY - y) * .09;
    orb.setAttribute('transform', `translate(${x * 5} ${y * 5})`);
    eyes.setAttribute('transform', `translate(${x * 4} ${y * 4})`);
    front.setAttribute('transform', `rotate(${x * 9} 90 90) translate(${x * 2} ${y * 3})`);
    back.setAttribute('transform', `rotate(${-x * 7} 90 90)`);
    sparks.setAttribute('transform', `translate(${-x * 7} ${-y * 7})`);
    frame = Math.abs(targetX - x) + Math.abs(targetY - y) > .002 ? requestAnimationFrame(render) : 0;
  }
  function move(event) {
    if (paused || reduced.matches || event.pointerType === 'touch') return;
    const bounds = scene.getBoundingClientRect();
    targetX = Math.max(-1, Math.min(1, (event.clientX - bounds.left - bounds.width / 2) / 350));
    targetY = Math.max(-1, Math.min(1, (event.clientY - bounds.top - bounds.height / 2) / 350));
    if (!frame) frame = requestAnimationFrame(render);
  }
  toggle.hidden = reduced.matches;
  toggle.addEventListener('click', () => {
    paused = !paused;
    scene.classList.toggle('paused', paused);
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.setAttribute('aria-label', paused ? toggle.dataset.resume : toggle.dataset.pause);
    toggle.title = toggle.getAttribute('aria-label');
    toggle.firstElementChild.textContent = paused ? '▷' : 'Ⅱ';
    reset();
  });
  reduced.addEventListener('change', () => { toggle.hidden = reduced.matches; reset(); });
  document.addEventListener('pointermove', move, { passive: true });
  document.documentElement.addEventListener('pointerleave', () => {
    targetX = targetY = 0;
    if (!frame && !paused && !reduced.matches) frame = requestAnimationFrame(render);
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden) reset(); });
})();
