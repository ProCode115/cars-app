// Dark / Light Mode
const toggleButton = document.getElementById('mode-toggle');
if(localStorage.getItem('mode')) { document.body.className = localStorage.getItem('mode'); } 
else { document.body.className = 'dark-mode'; }
toggleButton.addEventListener('click', () => {
  if(document.body.classList.contains('dark-mode')) {
    document.body.classList.replace('dark-mode','light-mode');
    localStorage.setItem('mode','light-mode');
  } else {
    document.body.classList.replace('light-mode','dark-mode');
    localStorage.setItem('mode','dark-mode');
  }
});

// Marken-Slideshow alle 10 Sekunden
document.querySelectorAll('.brand-slider').forEach(slider => {
  let current = 0;
  const images = slider.querySelectorAll('img');
  images[current].classList.add('active');
  setInterval(() => {
    images[current].classList.remove('active');
    current = (current + 1) % images.length;
    images[current].classList.add('active');
  }, 10000);
});

// Chat-Funktion
function sendMessage() {
  const textarea = document.querySelector('#chat textarea');
  const response = document.getElementById('response');
  response.innerHTML = `Du hast geschrieben: ${textarea.value}`;
  textarea.value = '';
}

// News-Beispiele
const newsBanner = document.getElementById('news-banner');
const sampleNews = [
  {title:"Neue Porsche Modelle 2025", link:"#", img:"https://cdn.motor1.com/images/mgl/0ANk0/s1/porsche-911-turbo.jpg"},
  {title:"BMW i4 Update", link:"#", img:"https://cdn.motor1.com/images/mgl/0ANk0/s1/bmw-i4.jpg"},
  {title:"Audi R8 Facelift", link:"#", img:"https://cdn.motor1.com/images/mgl/0ANk0/s1/audi-r8.jpg"},
  {title:"Bugatti Chiron Super Sport", link:"#", img:"https://cdn.motor1.com/images/mgl/0ANk0/s1/bugatti-chiron.jpg"},
  {title:"Koenigsegg Gemera Launch", link:"#", img:"https://cdn.motor1.com/images/mgl/0ANk0/s1/koenigsegg-gemera.jpg"}
];
sampleNews.forEach(item=>{
  const div=document.createElement('div');
  div.classList.add('news-item');
  div.innerHTML=`<img src="${item.img}" alt="${item.title}"><h3><a href="${item.link}" target="_blank">${item.title}</a></h3>`;
  newsBanner.appendChild(div);
});

// Drag & Drop Hero Image
const fileInput = document.getElementById('file-input');
const heroImg = document.getElementById('hero-img');
fileInput.addEventListener('change', e => {
  const file = e.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = () => { heroImg.src = reader.result; };
  reader.readAsDataURL(file);
});
const hero = document.getElementById('hero');
hero.addEventListener('dragover', e => e.preventDefault());
hero.addEventListener('drop', e => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = () => { heroImg.src = reader.result; };
  reader.readAsDataURL(file);
});

// Öffnen externer Seiten frisch (Google, YouTube, Mobile)
function openFresh(url) {
  window.open(url, '_blank', 'noopener,noreferrer');
}
