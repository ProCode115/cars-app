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

// Banner Slider
const slides = document.querySelectorAll('.banner-slide');
let currentSlide = 0;
function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  slides[index].classList.add('active');
}
setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}, 5000);

// Marken-Buttons
function openBrand(url) {
  window.open(url, '_blank');
}

// Chat-Funktion (Platzhalter)
function sendMessage() {
  const textarea = document.querySelector('#chat textarea');
  const response = document.getElementById('response');
  response.innerHTML = `Du hast geschrieben: ${textarea.value}`;
  textarea.value = '';
}
