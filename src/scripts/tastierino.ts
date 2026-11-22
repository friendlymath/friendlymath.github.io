/** Tastierino numerico grande (regolazione «tastierino»): evita di dover scrivere con la tastiera. */
export function aggiungiTastierino(inp: HTMLInputElement, dopo: Element) {
  inp.setAttribute('inputmode', 'none');
  const t = document.createElement('div');
  t.className = 'tastierino';
  for (const k of ['7', '8', '9', '4', '5', '6', '1', '2', '3', '−', '0', ',', '⌫']) {
    const b = document.createElement('button');
    b.type = 'button'; b.textContent = k; b.setAttribute('aria-label', k === '⌫' ? 'Cancella' : k === '−' ? 'meno' : k);
    b.addEventListener('click', () => {
      if (k === '⌫') inp.value = inp.value.slice(0, -1);
      else if (k === '−') inp.value = inp.value.startsWith('-') ? inp.value.slice(1) : '-' + inp.value;
      else inp.value += k;
      inp.dispatchEvent(new Event('input', { bubbles: true }));
    });
    t.appendChild(b);
  }
  dopo.after(t);
}
