/* =========================
   Car Collector - script.js
   - News (Motor1 DE via AllOrigins)
   - Brands + preview + slideshow
   - Hero drag/drop + lights
   - Dark/Light mode (localStorage)
   - Quick links (open fresh)
   - Chat placeholder
   - PWA friendly
   ========================= */

/* ---------- CONFIG ---------- */
const MOTOR1_RSS = 'https://www.motor1.com/rss/news/'; // Motor1 Deutschland RSS
const CORS_PROXY = 'https://api.allorigins.win/raw?url='; // public CORS proxy; if blocked, replace

/* ---------- DOM refs ---------- */
const newsSlider = document.getElementById('news-slider');
const refreshNewsBtn = document.getElementById('refresh-news');
const brandGrid = document.getElementById('brand-grid');
const heroImg = document.getElementById('hero-img');
const heroLights = document.getElementById('hero-lights');
const fileInput = document.getElementById('file-input');
const colorSelect = document.getElementById('color-select');
const lightsSelect = document.getElementById('lights-select');
const previewImg = document.getElementById('preview-img');
const selectedBrand = document.getElementById('selected-brand');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');
const chatResponse = document.getElementById('chat-response');
const modeToggle = document.getElementById('mode-toggle');
const openGoogleBtn = document.getElementById('open-google');
const openYoutubeBtn = document.getElementById('open-youtube');
const openMobileBtn = document.getElementById('open-mobile');

/* ---------- INITIAL SETUP ---------- */
// Dark mode default
if (localStorage.getItem('cc-mode')) {
  document.body.className = localStorage.getItem('cc-mode');
} else {
  document.body.classList.add('dark-mode'); // default dark like Apple
  localStorage.setItem('cc-mode','dark-mode');
}

// toggle mode
modeToggle.addEventListener('click', () => {
  if (document.body.classList.contains('dark-mode')) {
    document.body.classList.replace('dark-mode','light-mode');
    localStorage.setItem('cc-mode','light-mode');
    modeToggle.textContent = '☀️';
  } else {
    document.body.classList.replace('light-mode','dark-mode');
    localStorage.setItem('cc-mode','dark-mode');
    modeToggle.textContent = '🌙';
  }
});

/* ---------- HELPER: OPEN FRESH (no opener leak) ---------- */
function openFresh(url) {
  window.open(url, '_blank', 'noopener,noreferrer');
}
openGoogleBtn.addEventListener('click', ()=> openFresh('https://www.google.com'));
openYoutubeBtn.addEventListener('click', ()=> openFresh('https://www.youtube.com'));
openMobileBtn.addEventListener('click', ()=> openFresh('https://www.mobile.de'));

/* ---------- BRANDS: data and rendering ---------- */
const BRANDS = [
  { id:'porsche',  name:'Porsche', link:'https://www.porsche.com', imgs:[
      'https://cdn.motor1.com/images/mgl/0ANk0/s1/porsche-911-turbo.jpg',
      'https://cdn.motor1.com/images/mgl/6lLrR/s1/porsche-taycan.jpg'
    ]},
  { id:'bmw',      name:'BMW', link:'https://www.bmw.com', imgs:[
      'https://cdn.motor1.com/images/mgl/0ANk0/s1/bmw-m4.jpg',
      'https://cdn.motor1.com/images/mgl/6lLrR/s1/bmw-i4.jpg'
    ]},
  { id:'audi',     name:'Audi', link:'https://www.audi.com', imgs:[
      'https://cdn.motor1.com/images/mgl/0ANk0/s1/audi-r8.jpg',
      'https://cdn.motor1.com/images/mgl/6lLrR/s1/audi-rs7.jpg'
    ]},
  { id:'lamborghini', name:'Lamborghini', link:'https://www.lamborghini.com', imgs:[
      'https://cdn.motor1.com/images/mgl/0ANk0/s1/lamborghini-aventador.jpg',
      'https://cdn.motor1.com/images/mgl/6lLrR/s1/lamborghini-huracan.jpg'
    ]},
  { id:'koenigsegg', name:'Koenigsegg', link:'https://www.koenigsegg.com', imgs:[
      'https://cdn.motor1.com/images/mgl/0ANk0/s1/koenigsegg-jesko.jpg',
      'https://cdn.motor1.com/images/mgl/6lLrR/s1/koenigsegg-gemera.jpg'
    ]},
  { id:'bugatti',  name:'Bugatti', link:'https://www.bugatti.com', imgs:[
      'https://cdn.motor1.com/images/mgl/0ANk0/s1/bugatti-chiron.jpg',
      'https://cdn.motor1.com/images/mgl/6lLrR/s1/bugatti-divo.jpg'
    ]},
  { id:'aston',    name:'Aston Martin', link:'https://www.astonmartin.com', imgs:[
      'https://cdn.motor1.com/images/mgl/0ANk0/s1/aston-martin-db11.jpg',
      'https://cdn.motor1.com/images/mgl/6lLrR/s1/aston-martin-vantage.jpg'
    ]},
  { id:'pagani',   name:'Pagani', link:'https://www.pagani.com', imgs:[
      'https://cdn.motor1.com/images/mgl/0ANk0/s1/pagani-huayra.jpg',
      'https://cdn.motor1.com/images/mgl/6lLrR/s1/pagani-zonda.jpg'
    ]},
  { id:'brabus',   name:'Brabus', link:'https://www.brabus.com', imgs:[
      'https://cdn.motor1.com/images/mgl/0ANk0/s1/brabus-vehicle.jpg',
      'https://cdn.motor1.com/images/mgl/6lLrR/s1/brabus-vehicle2.jpg'
    ]}
];

function renderBrands() {
  brandGrid.innerHTML = '';
  BRANDS.forEach(brand => {
    const card = document.createElement('div');
    card.className = 'brand-card fade-in';
    card.title = brand.name;
    card.tabIndex = 0;
    // image
    const img = document.createElement('img');
    img.src = brand.imgs[0];
    img.alt = brand.name;
    img.dataset.img1 = brand.imgs[0];
    img.dataset.img2 = brand.imgs[1] || brand.imgs[0];
    // name
    const h = document.createElement('div');
    h.className = 'brand-name';
    h.textContent = brand.name;
    card.appendChild(img);
    card.appendChild(h);
    card.addEventListener('click', ()=> {
      openFresh(brand.link);
    });
    // when clicked, show in preview
    card.addEventListener('dblclick', ()=> {
      previewImg.src = img.src;
      selectedBrand.textContent = brand.name;
    });
    brandGrid.appendChild(card);
  });

  // start brand mini slideshows
  startBrandSlideshows();
}

/* brand slideshows: swap image every 10s */
function startBrandSlideshows() {
  const imgs = document.querySelectorAll('.brand-card img');
  imgs.forEach(img => {
    let showAlt = false;
    setInterval(()=> {
      img.src = showAlt ? img.dataset.img1 : img.dataset.img2;
      showAlt = !showAlt;
    }, 10000);
  });
}

/* ---------- HERO lights animation ---------- */
function spawnHeroLights(count=6) {
  heroLights.innerHTML = '';
  for (let i=0;i<count;i++){
    const bulb = document.createElement('div');
    bulb.className = 'hero-bulb';
    // random position and size
    const size = 60 + Math.random()*120;
    bulb.style.width = `${size}px`;
    bulb.style.height = `${Math.max(8, size*0.08)}px`;
    bulb.style.left = `${10 + Math.random()*80}%`;
    bulb.style.top = `${30 + Math.random()*40}%`;
    bulb.style.background = lightsSelect.value || '#ff3b3b';
    bulb.style.borderRadius = '40px';
    bulb.style.filter = 'blur(12px)';
    bulb.style.opacity = 0.2;
    bulb.style.transition = 'opacity 0.6s ease';
    heroLights.appendChild(bulb);
    // animate flicker
    setTimeout(()=> bulb.style.opacity = 1, 10 + Math.random()*400);
    setTimeout(()=> bulb.style.opacity = 0.15, 1200 + Math.random()*1000);
  }
}
spawnHeroLights();
setInterval(()=> { spawnHeroLights(); }, 3500);

/* update hero appearance based on config */
function updateHeroAppearance() {
  previewImg.src = heroImg.src;
  // border color
  const color = colorSelect.value;
  if (color && color !== 'transparent') {
    heroImg.style.border = `6px solid ${color}`;
    previewImg.style.border = `4px solid ${color}`;
  } else {
    heroImg.style.border = 'none';
    previewImg.style.border = 'none';
  }
  // lights color
  Array.from(document.querySelectorAll('.hero-bulb')).forEach(b => { b.style.background = lightsSelect.value; });
  heroImg.style.filter = `brightness(0.85)`;
}

/* file input drag/drop */
fileInput.addEventListener('change', (e) => {
  const f = e.target.files[0];
  if (!f) return;
  const reader = new FileReader();
  reader.onload = () => {
    heroImg.src = reader.result;
    previewImg.src = reader.result;
    updateHeroAppearance();
  };
  reader.readAsDataURL(f);
});

const heroSection = document.getElementById('hero');
heroSection.addEventListener('dragover', e => e.preventDefault());
heroSection.addEventListener('drop', e => {
  e.preventDefault();
  const f = e.dataTransfer.files[0];
  if (!f) return;
  const reader = new FileReader();
  reader.onload = () => { heroImg.src = reader.result; previewImg.src = reader.result; updateHeroAppearance(); };
  reader.readAsDataURL(f);
});

/* color/light changes apply */
colorSelect.addEventListener('change', updateHeroAppearance);
lightsSelect.addEventListener('change', updateHeroAppearance);

/* ---------- CHAT ---------- */
chatSend.addEventListener('click', ()=> {
  const text = chatInput.value.trim();
  if (!text) { chatResponse.textContent = 'Bitte Nachricht eingeben.'; return; }
  chatResponse.innerHTML = `<strong>Sie:</strong> ${text} <br><em>Car Collector:</em> Danke! Wir schauen es uns an.`;
  chatInput.value = '';
});

/* ---------- NEWS: fetch Motor1 RSS via AllOrigins and render ---------- */
async function fetchMotor1News() {
  // clear existing
  newsSlider.innerHTML = '';
  const feedUrl = encodeURIComponent(MOTOR1_RSS);
  const url = `${CORS_PROXY}${feedUrl}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Feed nicht erreichbar');
    const xmlText = await res.text();
    // parse XML
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlText, 'application/xml');
    // items
    const items = Array.from(xml.querySelectorAll('item')).slice(0, 8); // take 8 and then show 5 maybe
    let added = 0;
    for (let it of items) {
      if (added >= 5) break;
      const titleNode = it.querySelector('title');
      const linkNode = it.querySelector('link');
      // try to find image: media:content, enclosure, or inside description <img>
      let imgUrl = '';
      const media = it.querySelector('media\\:content, content');
      if (media && media.getAttribute('url')) imgUrl = media.getAttribute('url');
      const enclosure = it.querySelector('enclosure');
      if (!imgUrl && enclosure && enclosure.getAttribute('url')) imgUrl = enclosure.getAttribute('url');
      // try description
      if (!imgUrl) {
        const desc = it.querySelector('description');
        if (desc) {
          const html = desc.textContent;
          const tmp = /<img[^>]+src="([^">]+)"/i.exec(html);
          if (tmp && tmp[1]) imgUrl = tmp[1];
        }
      }
      // fallback placeholder
      if (!imgUrl) imgUrl = 'https://via.placeholder.com/800x450?text=Car+News';

      const title = titleNode ? titleNode.textContent : 'Motor1 News';
      const link = linkNode ? linkNode.textContent : '#';

      // create card
      const card = document.createElement('article');
      card.className = 'news-card';
      card.innerHTML = `
        <a class="news-link" href="${link}" target="_blank" rel="noopener noreferrer">
          <img loading="lazy" src="${imgUrl}" alt="${escapeHtml(title)}">
          <div class="news-body">
            <h3 class="news-title">${escapeHtml(title)}</h3>
            <p class="news-excerpt">Weiterlesen auf Motor1.de</p>
          </div>
        </a>
      `;
      newsSlider.appendChild(card);
      added++;
    }

    // if still empty, show sample entries
    if (newsSlider.children.length === 0) {
      renderSampleNews();
    }

  } catch (err) {
    console.warn('News fetch failed:', err);
    renderSampleNews();
  }
}

function renderSampleNews(){
  const sample = [
    {title:'Beispiel: Porsche zeigt neues Modell', img:'https://cdn.motor1.com/images/mgl/0ANk0/s1/porsche-911-turbo.jpg', link:'#'},
    {title:'Beispiel: BMW präsentiert Update', img:'https://cdn.motor1.com/images/mgl/0ANk0/s1/bmw-m4.jpg', link:'#'},
    {title:'Beispiel: Lamborghini Special Edition', img:'https://cdn.motor1.com/images/mgl/0ANk0/s1/lamborghini-aventador.jpg', link:'#'}
  ];
  newsSlider.innerHTML = '';
  sample.forEach(it => {
    const card = document.createElement('article');
    card.className = 'news-card';
    card.innerHTML = `
      <a class="news-link" href="${it.link}">
        <img loading="lazy" src="${it.img}" alt="${escapeHtml(it.title)}">
        <div class="news-body"><h3 class="news-title">${escapeHtml(it.title)}</h3><p class="news-excerpt">Beispieltext</p></div>
      </a>`;
    newsSlider.appendChild(card);
  });
}

/* utility escape to avoid weird characters */
function escapeHtml(s){
  if(!s) return '';
  return s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
}

/* refresh button */
refreshNewsBtn.addEventListener('click', ()=> fetchMotor1News());

/* fetch on load */
fetchMotor1News();

/* auto-refresh every 10 minutes */
setInterval(()=> fetchMotor1News(), 1000 * 60 * 10);

/* ---------- small accessibility: keyboard open brand ---------- */
document.addEventListener('keydown', (e)=>{
  if(e.key === '1') fetchMotor1News();
});

/* ---------- PREVIEW: when clicking brand thumbnails, set preview image ---------- */
brandGrid.addEventListener('click', (ev) => {
  const card = ev.target.closest('.brand-card');
  if (!card) return;
  const img = card.querySelector('img');
  const name = card.querySelector('.brand-name')?.textContent || 'Marke';
  previewImg.src = img.src;
  selectedBrand.textContent = name;
});

/* ---------- STARTUP: render brands ---------- */
renderBrands();

/* ---------- small: register service worker is in index.html earlier; also install handler below (optional) ---------- */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.ready.then(reg => {
    // optional: tell the user offline available
  }).catch(()=>{/*ignore*/});
}

/* ---------- helper: simple console log for debugging ---------- */
console.log('Car Collector initialisiert');

/* END of script.js */
