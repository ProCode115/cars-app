import OpenAI from "https://cdn.jsdelivr.net/npm/openai@latest/dist/openai.min.js";

const apiKey = "DEIN_API_KEY_HIER"; // Nur lokal oder via Proxy nutzen!
const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const responseDiv = document.getElementById("response");

sendBtn.addEventListener("click", async () => {
  const prompt = userInput.value.trim();
  if (!prompt) return;
  responseDiv.textContent = "CarAI denkt nach... 🤔";

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Du bist CarAI, ein Auto-Experte. Antworte immer auf Deutsch." },
        { role: "user", content: prompt },
      ],
    });

    responseDiv.textContent = completion.choices[0].message.content;
  } catch (error) {
    responseDiv.textContent = "Fehler: " + (error.message || error);
  }
});

let bannerIndex = 0;
const slides = document.querySelectorAll(".banner-slide");
if (slides.length > 0) {
  setInterval(() => {
    slides[bannerIndex].classList.remove("active");
    bannerIndex = (bannerIndex + 1) % slides.length;
    slides[bannerIndex].classList.add("active");
  }, 4000);
}

window.openBrand = (url) => {
  window.open(url, "_blank");
};

window.openTab = (brand) => {
  const content = {
    apple: "🍏 Apple: iPhone 16 Review – mehr KI als je zuvor!",
    samsung: "📱 Samsung Galaxy S25 Ultra Leak – neue Kamera!",
    xiaomi: "⚙️ Xiaomi 15 – Leistung trifft Design.",
    honor: "✨ Honor Magic 7 – elegantes Flaggschiff mit Power.",
  };
  document.getElementById("tab-content").textContent = content[brand] || "";
};
