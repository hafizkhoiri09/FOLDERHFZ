const startCountdownBtn = document.getElementById("startCountdownBtn");
const countdownDisplay = document.getElementById("countdownDisplay");
const countdownSteps = ["5", "4", "3", "2", "1", "🎉 ayo! dan masuk..."];
let countdownIndex = 0;
let countdownActive = false;

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playCountdownTone(frequency = 440, duration = 120) {
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = "sine";
  oscillator.frequency.value = frequency;
  gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.22, audioContext.currentTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration / 1000);
  oscillator.connect(gain).connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + duration / 1000);
}

function createHeartBurst() {
  const overlay = document.createElement("div");
  overlay.className = "heart-burst-overlay";

  for (let i = 0; i < 18; i += 1) {
    const heart = document.createElement("span");
    heart.className = "heart-burst";
    heart.textContent = "❤";
    const offsetX = Math.random() * 220 - 110;
    const offsetY = Math.random() * -180 - 40;
    const delay = Math.random() * 0.25;
    const scale = Math.random() * 0.5 + 0.9;
    heart.style.setProperty("--tx", `${offsetX}px`);
    heart.style.setProperty("--ty", `${offsetY}px`);
    heart.style.setProperty("--delay", `${delay}s`);
    heart.style.setProperty("--scale", `${scale}`);
    overlay.appendChild(heart);
  }

  document.body.appendChild(overlay);
  setTimeout(() => overlay.remove(), 1400);
}

function showNextCountdown() {
  if (countdownIndex >= countdownSteps.length) {
    countdownDisplay.textContent = "Masuk ke momen spesial...";
    setTimeout(() => {
      window.location.href = "moment.html";
    }, 900);
    return;
  }

  countdownDisplay.textContent = countdownSteps[countdownIndex];
  const tone = 560 - countdownIndex * 40;
  playCountdownTone(tone, 150);
  countdownIndex += 1;
  setTimeout(showNextCountdown, 900);
}

if (startCountdownBtn) {
  startCountdownBtn.addEventListener("click", () => {
    if (countdownActive) return;
    countdownActive = true;
    startCountdownBtn.disabled = true;
    startCountdownBtn.textContent = "Sedang menghitung...";
    showNextCountdown();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  createHeartBurst();
});
