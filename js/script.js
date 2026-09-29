/* Voice Work interactions */

function stage(el, message) {
  document.querySelectorAll('.stage').forEach(item => item.classList.remove('active'));
  el.classList.add('active');
  const commentary = document.querySelector('.vw-commentary');
  if (commentary) commentary.textContent = message;
}

function updateCalculator() {
  const episodes = document.getElementById('ep');
  const length = document.getElementById('ln');
  const eo = document.getElementById('eo');
  const lo = document.getElementById('lo');
  const diy = document.getElementById('diy');
  const client = document.getElementById('cl');
  const saved = document.getElementById('sv');
  if (!episodes || !length) return;

  const e = Number(episodes.value);
  const l = Number(length.value);
  const diyHours = Math.round(e * (l / 60) * 8);
  const clientHours = Math.max(1, Math.round(e * (l / 60)));
  const savedHours = Math.max(0, diyHours - clientHours);

  if (eo) eo.textContent = e;
  if (lo) lo.textContent = `${l} min`;
  if (diy) diy.textContent = `${diyHours} hrs / mo`;
  if (client) client.textContent = `${clientHours} hrs / mo`;
  if (saved) saved.textContent = `${savedHours} hrs / mo`;
}

document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.track');
  const originalSet = track?.querySelector('.set');
  if (track && originalSet && track.querySelectorAll('.set').length === 1) {
    const clone = originalSet.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    clone.querySelectorAll('a').forEach(link => link.setAttribute('tabindex', '-1'));
    track.appendChild(clone);
  }

  document.getElementById('ep')?.addEventListener('input', updateCalculator);
  document.getElementById('ln')?.addEventListener('input', updateCalculator);
  updateCalculator();

  document.addEventListener('mousemove', event => {
    document.documentElement.style.setProperty('--mx', `${event.clientX}px`);
    document.documentElement.style.setProperty('--my', `${event.clientY}px`);
  }, { passive: true });
});

function faqTab(button) {
  const category = button.dataset.cat;
  document.querySelectorAll('.faq-tab').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.faq-group').forEach(group => group.classList.remove('active'));
  button.classList.add('active');
  document.querySelector(`.faq-group[data-cat="${category}"]`)?.classList.add('active');
}

function faq(button) {
  const item = button.closest('.faqitem');
  if (!item) return;
  item.classList.toggle('open');
  const icon = button.querySelector('span');
  if (icon) icon.textContent = item.classList.contains('open') ? '⌃' : '⌄';
}
