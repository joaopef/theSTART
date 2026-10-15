(() => {
  const article = document.querySelector('.guide-content');
  if (!article) return;
  function revealHash() {
    if (!location.hash) return;
    let target;
    try { target = document.getElementById(decodeURIComponent(location.hash.slice(1))); } catch { return; }
    if (!target || !article.contains(target)) return;
    for (let parent = target.parentElement; parent && parent !== article; parent = parent.parentElement) {
      if (parent.tagName === 'DETAILS') parent.open = true;
    }
    target.scrollIntoView();
  }
  revealHash();
  window.addEventListener('hashchange', revealHash);
  for (const table of article.querySelectorAll('table')) {
    const wrapper = document.createElement('div');
    wrapper.className = 'table-scroll';
    wrapper.tabIndex = 0;
    wrapper.setAttribute('role', 'region');
    wrapper.setAttribute('aria-label', document.body.dataset.language === 'pt' ? 'Tabela: deslocar para ver todas as colunas' : 'Table: scroll to see all columns');
    table.before(wrapper);
    wrapper.append(table);
  }
  if (navigator.clipboard && window.isSecureContext) {
    for (const pre of article.querySelectorAll('pre')) {
      const container = pre.parentElement.matches('.highlight,.codehilite') ? pre.parentElement : pre;
      const button = document.createElement('button');
      button.className = 'copy-code';
      button.type = 'button';
      button.textContent = article.dataset.copy;
      button.setAttribute('aria-live', 'polite');
      button.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText((pre.querySelector('code') || pre).textContent);
          button.textContent = article.dataset.copied;
        } catch { button.textContent = article.dataset.failed; }
        setTimeout(() => { button.textContent = article.dataset.copy; }, 2000);
      });
      container.append(button);
    }
  }
  const contents = document.querySelector('.desktop-contents');
  if ('IntersectionObserver' in window && contents) {
    const links = [...contents.querySelectorAll('a[href^="#"]')];
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        for (const link of links) {
          if (decodeURIComponent(link.hash.slice(1)) === entry.target.id) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        }
      }
    }, { rootMargin: '0px 0px -65% 0px' });
    for (const heading of article.querySelectorAll('h2[id],h3[id]')) observer.observe(heading);
  }
  const search = document.querySelector('.guide-search');
  const input = search.querySelector('input');
  const status = search.querySelector('.search-status');
  const results = search.querySelector('.search-results');
  const pt = document.body.dataset.language === 'pt';
  const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  let indexPromise;
  let request = 0;
  search.hidden = false;
  search.addEventListener('toggle', () => { if (search.open) input.focus(); });
  search.addEventListener('keydown', event => { if (event.key === 'Escape') { search.open = false; search.querySelector('summary').focus(); } });
  input.addEventListener('input', async () => {
    const current = ++request;
    const query = normalize(input.value.trim());
    results.replaceChildren();
    if (query.length < 2) { status.textContent = ''; return; }
    status.textContent = pt ? 'A pesquisar…' : 'Searching…';
    try {
      if (!indexPromise) indexPromise = fetch(search.dataset.index).then(response => {
        if (!response.ok) throw new Error('Search unavailable');
        return response.json().then(index => ({ docs: index.docs.map(doc => ({
          ...doc,
          text: new DOMParser().parseFromString(doc.text, 'text/html').body.textContent.replace(/\s+/g, ' ').trim()
        })) }));
      }).catch(error => { indexPromise = undefined; throw error; });
      const index = await indexPromise;
      if (request !== current) return;
      const terms = query.split(/\s+/);
      const hits = index.docs.filter(doc => doc.location.startsWith('pt/') === pt && terms.every(term => normalize(doc.title + ' ' + doc.text).includes(term))).slice(0, 8);
      status.textContent = hits.length ? (pt ? 'Resultados' : 'Results') : (pt ? 'Sem resultados. Experimenta outro termo.' : 'No results. Try another term.');
      const base = new URL('../', new URL(search.dataset.index, location.href));
      for (const hit of hits) {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = new URL(hit.location, base).href;
        const title = document.createElement('strong');
        title.textContent = hit.title;
        const excerpt = document.createElement('p');
        const start = Math.max(0, normalize(hit.text).indexOf(terms[0]) - 45);
        excerpt.textContent = (start ? '…' : '') + hit.text.slice(start, start + 150) + (hit.text.length > start + 150 ? '…' : '');
        link.append(title, excerpt);
        li.append(link);
        results.append(li);
      }
    } catch {
      if (request === current) status.textContent = pt ? 'Não foi possível pesquisar. Usa as ligações no fim do guia.' : 'Search is unavailable. Use the guide links below.';
    }
  });
})();
