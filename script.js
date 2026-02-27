// Scroll suave para âncoras
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (!id || id === "#") return;
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Botão Música
document.getElementById("btnMusic")?.addEventListener("click", () => {
  document.getElementById("musica")?.scrollIntoView({ behavior: "smooth", block: "center" });
});

// Modo noite (fade suave)
const btnNight = document.getElementById("btnNight");
btnNight?.addEventListener("click", () => {
  document.body.classList.toggle("night");
  btnNight.textContent = document.body.classList.contains("night") ? "☀️ Modo dia" : "🌙 Modo noite";
});

// Reveal ao rolar
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Galeria com modal (isso impede de “ficar preso” na camada escura)
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalClose = document.getElementById("modalClose");

function openModal(src, alt){
  if (!modal || !modalImg) return;
  modalImg.src = src;
  modalImg.alt = alt || "Foto ampliada";
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeModal(){
  if (!modal) return;
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (modalImg) modalImg.src = "";
}
document.getElementById("gallery")?.addEventListener("click", (e) => {
  const img = e.target;
  if (!(img instanceof HTMLImageElement)) return;
  openModal(img.src, img.alt);
});
modalClose?.addEventListener("click", closeModal);
modal?.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

// Mensagem secreta (aparece só depois do clique)
const btnSecret = document.getElementById("btnSecret");
const secretText = document.getElementById("secretText");
let secretShown = false;

const secretMessages = [
  "Se eu pudesse voltar no tempo, eu te escolheria de novo. ❤️",
  "Meu lugar favorito é onde você está. 🥀",
  "Você é minha paz… e meu caos favorito. ❤️‍🔥",
  "Promete ficar? Eu prometo cuidar. ❤️",
  "Eu te amo no detalhe, no silêncio e no abraço. ❤️"
];

btnSecret?.addEventListener("click", () => {
  if (!secretText) return;

  if (!secretShown){
    const i = Math.floor(Math.random() * secretMessages.length);
    secretText.textContent = secretMessages[i];
    secretText.classList.add("show");
    secretShown = true;
    btnSecret.textContent = "🔓 Segredo revelado";
  } else {
    // segundo clique: troca a frase
    const i = Math.floor(Math.random() * secretMessages.length);
    secretText.textContent = secretMessages[i];
  }

  secretText.animate(
    [{ transform: "translateY(8px)", opacity: 0 }, { transform: "translateY(0)", opacity: 1 }],
    { duration: 420, easing: "ease-out" }
  );
});

// Frases finais
const btnSurprise = document.getElementById("btnSurprise");
const surpriseText = document.getElementById("surpriseText");
const frases = [
  "Você é meu amor calmo e meu amor forte. ❤️",
  "Você me faz querer ser melhor. 🥀",
  "Eu te amo no simples e no eterno. ❤️",
  "Com você, tudo faz sentido. ❤️‍🔥",
  "Eu escolho você. Sempre. ❤️"
];
btnSurprise?.addEventListener("click", () => {
  if (!surpriseText) return;
  const i = Math.floor(Math.random() * frases.length);
  surpriseText.textContent = frases[i];
  surpriseText.animate(
    [{ transform: "translateY(6px)", opacity: 0 }, { transform: "translateY(0)", opacity: 1 }],
    { duration: 420, easing: "ease-out" }
  );
});

// Animação de rosas/corações vermelhos (leve, não bloqueia cliques)
const floatLayer = document.querySelector(".float-layer");
const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

function spawnFloat(){
  if (!floatLayer || prefersReduced) return;

  const el = document.createElement("div");
  el.className = "float";
  // mistura rosas e corações
  const options = ["🥀", "❤️", "❤️‍🔥", "🌹"];
  el.textContent = options[Math.floor(Math.random() * options.length)];

  const left = Math.random() * 100;
  const size = 14 + Math.random() * 22;
  const duration = 7000 + Math.random() * 5500;

  el.style.left = left + "vw";
  el.style.fontSize = size + "px";
  el.style.animationDuration = duration + "ms";

  floatLayer.appendChild(el);
  setTimeout(() => el.remove(), duration + 200);
}

setInterval(spawnFloat, 520);
