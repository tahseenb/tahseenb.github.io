(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');
  const systemDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches;
  toggle?.addEventListener('click', () => {
    const current = root.dataset.theme || (systemDark() ? 'dark' : 'light');
    const next = current === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
  });
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
