/* ------------------ Dark / Light Mode ------------------ */
const toggleButton = document.getElementById('mode-toggle');
if(localStorage.getItem('mode')) {
  document.body.className = localStorage.getItem('mode');
} else {
  document.body.className = 'dark-mode';
}

toggleButton.addEventListener('click', () => {
  if(document.body.classList.contains('dark-mode')) {
    document.body.classList.replace('dark-mode','light-mode');
    localStorage.setItem('mode','light-mode');
  } else {
    document.body.classList.replace('light-mode','dark-mode');
    localStorage.setItem('mode','dark-mode');
  }
});

/* ------------------ Marken-Daten ------------------ */
const brands = [
  {name:"Porsche", link:"https://www.porsche.com", imgs:["https://cdn.motor1.com/images/mgl/0ANk0/s1/porsche-911-turbo.jpg","https://cdn.motor1.com/images/mgl/6lLrR/s1/porsche-taycan.jpg"]},
  {name:"BMW", link:"https://www.bmw.com", imgs:["https://cdn.motor1.com/images/mgl/0ANk0/s1/bmw-i4.jpg","https://cdn.motor1.com/images/mgl/6lLrR/s1/bmw-m4.jpg"]},
  {name:"Audi", link:"https://www.audi.com", imgs:["https://cdn.motor1.com/images/mgl/0ANk0/s1/audi-r8.jpg","https://cdn.motor1.com/images/mgl/6lLrR/s1/audi-rs7.jpg"]},
  {name:"Brabus", link:"https://www.brabus.com", imgs:["https://www.brabus.com/media/vehicle1.jpg","https://www.brabus.com/media/vehicle2.jpg"]},
  {name:"Lamborghini", link:"https://www.lamborghini.com", imgs:["https://cdn.motor1.com/images/mgl/0ANk0/s1/lamborghini-aventador.jpg","https://cdn.motor1.com/images/mgl/6lLrR/s1/lamborghini-huracan.jpg"]},
  {name:"Koenigsegg", link:"https://www.koenigsegg.com", imgs:["https://cdn.motor1.com/images/mgl/0ANk0/s1/koenigsegg-jesko.jpg","https://cdn.motor1.com/images/mgl/6lLrR/s1/koenigsegg-gemera.jpg"]},
  {name:"Bugatti", link:"https://www.bugatti.com", imgs:["https://cdn.motor1.com/images/mgl/0ANk0/s1/bugatti-chiron.jpg","https://cdn.motor1.com/images/mgl/6lLrR/s1/bugatti-divo.jpg"]},
  {name:"Aston Martin", link:"https://www.astonmartin.com", imgs:["https://cdn.motor1.com/images/mgl/0ANk0/s1/aston-martin-db11.jpg","https://cdn.motor1.com/images/mgl/6lLrR/s1/aston-martin-vantage.jpg"]},
  {name:"Pagani", link:"https://www.pagani.com", imgs:["https://cdn.motor1.com/images/mgl/0ANk0/s1/pagani-huayra.jpg","https://cdn.motor1.com/images/mgl/6lLrR/s1/pagani-zonda.jpg"]}
];

/* ------------------ Marken-Karten dynamisch erstellen ------------------ */
const brandContainer = document.querySelector('.brand-container');

brands.forEach(brand => {
  const div = document.createElement('div');
  div.classList.add('brand-card');
  div.onclick = () => window.open(brand.link,'_blank','noopener,noreferrer');
  div.innerHTML = `
    <img src="${brand.imgs[0]}" data-img1="${brand.imgs[0]}" data-img2="${brand.imgs[1]}">
    <h3>${brand.name}</h3>
  `;
  brandContainer.appendChild(div);
});

/* ------------------ Marken-Slideshow alle 10s ------------------ */
document.querySelectorAll('.brand-card img').forEach(img => {
  let toggle = true;
  setInterval(()=>{
    img.src = toggle ? img.dataset.img2 : img.dataset.img1;
    toggle = !toggle;
  },10000);
});

/* ------------------ Hero Drag & Drop ------------------ */
const fileInput = document.getElementById('file-input');
const heroImg = document.getElementById('hero-img');
const hero = document.getElementById('hero');

fileInput.addEventListener('change', e=>{
  const file = e.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = () => heroImg.src = reader.result;
  reader.readAsDataURL(file);
});

hero.addEventListener('dragover', e=> e.preventDefault());
hero.addEventListener('drop', e=>{
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = () => heroImg.src = reader.result;
  reader.readAsDataURL(file);
});

/* ------------------ Hero Lichter Animation ------------------ */
const heroLights = document.getElementById('hero-lights');
function animateLights() {
  heroLights.innerHTML = '';
  for(let i=0;i<5;i++){
    const light = document.createElement('div');
    light.style.position='absolute';
    light.style.width='80px';
    light.style.height='12px';
    light.style.background='red';
    light.style.borderRadius='50%';
    light.style.top=`${Math.random()*80+10}%`;
    light.style.left=`${Math.random()*80+10}%`;
    light.style.filter='blur(10px)';
    light.style.animation=`blink ${Math.random()*2+1}s infinite`;
    heroLights.appendChild(light);
  }
}
animateLights();
setInterval(animateLights,3000);

/* ------------------ Quick Links ------------------ */
function openFresh(url){
  window.open(url,'_blank','noopener,noreferrer');
}

/* ------------------ Chat-Funktion ------------------ */
function sendMessage(){
  const textarea = document.querySelector('#chat textarea');
  const response = document.getElementById('response');
  const text = textarea.value.trim();
  if(!text){ response.innerHTML="Bitte schreibe etwas!"; return; }
  response.innerHTML=`<b>Du:</b> ${text}<br><i>Antwort:</i> Danke für deine Nachricht!`;
  textarea.value='';
}

/* ------------------ Auto-Konfiguration ------------------ */
const colorSelect = document.getElementById('color-select');
const lightsSelect = document.getElementById('lights-select');

colorSelect.addEventListener('change', updateCar);
lightsSelect.addEventListener('change', updateCar);

function updateCar(){
  const color = colorSelect.value;
  const light = lightsSelect.value;
  heroImg.style.filter = `drop-shadow(0 0 10px ${light}) brightness(0.7)`;
  heroImg.style.border = `5px solid ${color}`;
}

/* ------------------ Banner-News (Beispiel-Artikel) ------------------ */
const newsContainer = document.querySelector('.news-container');
const sampleNews = [
  {title:"Neue Porsche Modelle 2025", link:"#", img:"https://cdn.motor1.com/images/mgl/0ANk0/s1/porsche-911-turbo.jpg"},
  {title:"BMW i4 Update", link:"#", img:"https://cdn.motor1.com/images/mgl/0ANk0/s1/bmw-i4.jpg"},
  {title:"Audi R8 Facelift", link:"#", img:"https://cdn.motor1.com/images/mgl/0ANk0/s1/audi-r8.jpg"},
  {title:"Bugatti Chiron Super Sport", link:"#", img:"https://cdn.motor1.com/images/mgl/0ANk0/s1/bugatti-chiron.jpg"},
  {title:"Koenigsegg Gemera Launch", link:"#", img:"https://cdn.motor1.com/images/mgl/0ANk0/s1/koenigsegg-gemera.jpg"}
];

sampleNews.forEach(item=>{
  const div = document.createElement('div');
  div.classList.add('news-item');
  div.innerHTML=`<img src="${item.img}" alt="${item.title}"><h3><a href="${item.link}" target="_blank">${item.title}</a></h3>`;
  newsContainer.appendChild(div);
});

/* ------------------ Smooth Scroll & Animation ------------------ */
document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
  anchor.addEventListener('click', function(e){
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({behavior:'smooth'});
  });
});
