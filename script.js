// Dark / Light Mode Toggle
const toggleButton = document.getElementById('mode-toggle');
if(localStorage.getItem('mode')) {
  document.body.className = localStorage.getItem('mode');
} else {
  document.body.className = 'dark-mode';
}
toggleButton.addEventListener('click', () => {
  if(document.body.classList.contains('dark-mode')) {
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
    localStorage.setItem('mode', 'light-mode');
  } else {
    document.body.classList.remove('light-mode');
    document.body.classList.add('dark-mode');
    localStorage.setItem('mode', 'dark-mode');
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

// Auto-News von Motor1 (nur Text + Link, Bilder optional über API)
const newsBanner = document.getElementById('news-banner');
const sampleNews = [
  {title: "Neue Porsche Modelle 2025", link: "https://www.motor1.com/news/1", img:"https://cdn.motor1.com/images/mgl/0ANk0/s1/porsche-911-turbo.jpg"},
  {title: "BMW präsentiert i8 Update", link: "https://www.motor1.com/news/2", img:"https://cdn.motor1.com/images/mgl/0ANk0/s1/bmw-i8.jpg"},
  {title: "Audi R8 Facelift", link: "https://www.motor1.com/news/3", img:"https://cdn.motor1.com/images/mgl/0ANk0/s1/audi-r8.jpg"},
  {title: "Bugatti Chiron Super Sport", link: "https://www.motor1.com/news/4", img:"https://cdn.motor1.com/images/mgl/0ANk0/s1/bugatti-chiron.jpg"},
  {title: "Koenigsegg Gemera Launch", link: "https://www.motor1.com/news/5", img:"https://cdn.motor1.com/images/mgl/0ANk0/s1/koenigsegg-gemera.jpg"}
];

sampleNews.forEach(item=>{
  const div = document.createElement('div');
  div.classList.add('news-item');
  div.innerHTML = `<img src="${item.img}" alt="${item.title}"><h3><a href="${item.link}" target="_blank">${item.title}</a></h3>`;
  newsBanner.appendChild(div);
});
