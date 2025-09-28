fetch('data.json').then(response => response.json()).then(data => {
            document.getElementById('ime-para').innerHTML = data.imePara;
            document.getElementById('datum-svadbe').innerText = data.datumSvadbe;
            document.getElementById('drugitekst').innerHTML = data.drugitekst;
            document.getElementById('slika-para').src = data.slikaPara;
}).catch(error => console.error('Greška prilikom učitavanja JSON fajla:', error));

  const countDownDate = new Date("Mar 07, 2026 13:00:00").getTime();

const timer = document.getElementById("timer");

  const countdownFunction = setInterval(function () {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    if (distance < 0) {
      clearInterval(countdownFunction);
      timer.innerHTML = "Srećno!";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Formatiraj da uvek bude dvoznamenkasto
    const format = (n) => (n < 10 ? "0" + n : n);

    timer.innerHTML = `${format(days)} : ${format(hours)} : ${format(minutes)} : ${format(seconds)}`;
  }, 1000);
  // Pozovi ovo nakon što učitaš data.json (ili odmah, ako nemaš data.json)
document.addEventListener('DOMContentLoaded', () => {
  const cfg = (window.__INVITE_DATA && window.__INVITE_DATA.countdown) || {
    title: 'Radujemo se vašem dolasku!',
    targetISO: '2026-03-07T13:00:00+02:00'
  };
  insertCountdownAfterHeading(cfg);
});

/* Ubacuje countdown odmah ispod naslova "Organizacija" */
function insertCountdownAfterHeading(cfg = {}){
  const heading = document.querySelector('.h1-organizacija');
  if (!heading) return;

  const row = heading.closest('.row') || heading.parentElement;
  const wrap = document.createElement('div');
  wrap.className = 'container my-3';
  wrap.innerHTML = `
    <div class="text-center">
      <h2 class="cd2-title">${cfg.title || 'Radujemo se vašem dolasku!'}</h2>
      <div class="cd2-grid">
        <div class="cd2-seg">
          <div id="cd2-d" class="cd2-num">00</div>
          <div id="cd2-d-lab" class="cd2-lab">Dana</div>
        </div>
        <div class="cd2-seg">
          <div id="cd2-h" class="cd2-num">00</div>
          <div class="cd2-lab">Sati</div>
        </div>
        <div class="cd2-seg">
          <div id="cd2-m" class="cd2-num">00</div>
          <div class="cd2-lab">Minuta</div>
        </div>
        <div class="cd2-seg">
          <div id="cd2-s" class="cd2-num">00</div>
          <div class="cd2-lab">Sekundi</div>
        </div>
      </div>
    </div>`;
  row.after(wrap);

  injectCountdownStylesPink();                             // pastel pink boje
  startCountdown(cfg.targetISO || '2026-03-07T13:00:00+02:00', cfg.labels);
}

function injectCountdownStylesPink(){
  if (document.getElementById('cd2-style')) return;
  const css = `
    .cd2-title{
      font-family: 'Playfair Display', serif;
      text-transform: uppercase;
      letter-spacing: .08em;
      color: #ff96ae;                           /* pastel pink */
      font-size: clamp(1.2rem, 2.8vw, 2.2rem);
      margin-bottom: .6rem;
    }
    .cd2-grid{
      display:flex; gap: clamp(24px, 6vw, 80px);
      justify-content:center; align-items:flex-start;
    }
    .cd2-seg{ text-align:center; }
    .cd2-num{
      font-family: 'Playfair Display', serif;
      font-size: clamp(2.2rem, 7vw, 4.2rem);
      line-height:1; color:#ff96ae;
    }
    .cd2-lab{
      margin-top:.35rem; font-family:'Lato', sans-serif;
      font-size: clamp(.85rem, 2vw, 1.15rem);
      color:#ff96ae;
    }
    @media (max-width: 575.98px){ .cd2-grid{ gap:22px; } }
    @media (prefers-reduced-motion: reduce){
      .cd2-title, .cd2-num, .cd2-lab{ transition:none; animation:none; }
    }
  `;
  const style = document.createElement('style');
  style.id = 'cd2-style';
  style.textContent = css;
  document.head.appendChild(style);
}

function startCountdown(targetISO, labelsCfg){
  const dEl = document.getElementById('cd2-d');
  const hEl = document.getElementById('cd2-h');
  const mEl = document.getElementById('cd2-m');
  const sEl = document.getElementById('cd2-s');
  const dLab= document.getElementById('cd2-d-lab');

  const target = new Date(targetISO);
  if (isNaN(target.getTime())) return;

  const pad = n => (n < 10 ? '0'+n : ''+n);
  const labs = labelsCfg || {
    days:   { one:'Dan', many:'Dana' },
    hours:  { one:'Sat', many:'Sati' },
    minutes:{ one:'Minut', many:'Minuta' },
    seconds:{ one:'Sekunda', many:'Sekundi' }
  };
  const dayLabel = n => (n === 1 ? labs.days.one : labs.days.many);

  function tick(){
    const now = new Date();
    let diff = target - now;
    if (diff < 0) diff = 0;

    const sec = Math.floor(diff / 1000) % 60;
    const min = Math.floor(diff / (1000*60)) % 60;
    const hrs = Math.floor(diff / (1000*60*60)) % 24;
    const day = Math.floor(diff / (1000*60*60*24));

    if (dEl) dEl.textContent = pad(day);
    if (hEl) hEl.textContent = pad(hrs);
    if (mEl) mEl.textContent = pad(min);
    if (sEl) sEl.textContent = pad(sec);
    if (dLab) dLab.textContent = dayLabel(day);

    if (diff === 0) clearInterval(intId);
  }
  tick();
  const intId = setInterval(tick, 1000);
}
document.addEventListener('DOMContentLoaded', () => {
  const intro = document.getElementById('intro');
  const introNames = document.getElementById('intro-names');
  if (!intro || !introNames) return;

  // Upiši ime para: prioritet data.json, zatim #ime-para iz DOM-a, pa fallback
  let coupleHTML =
    (window.__INVITE_DATA && window.__INVITE_DATA.imePara) ||
    (document.getElementById('ime-para') && document.getElementById('ime-para').innerHTML) ||
    'Marija <br> & <br> Jovan';
  introNames.innerHTML = coupleHTML;

  // Automatsko gašenje nakon 3.2s, plus gašenje na klik/tap
  const hideIntro = () => intro.classList.add('is-done');
  setTimeout(hideIntro, 3200);
  intro.addEventListener('click', hideIntro, { once: true });
});
