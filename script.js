const detailSection = document.getElementById("detailSection");
const revealBtn = document.getElementById("revealBtn");
const floating = document.getElementById("floating");
const burstLayer = document.getElementById("burstLayer");
const mediaCards = Array.from(document.querySelectorAll(".media-card"));
const typingIntro = document.getElementById("typingIntro");
const detailText = document.getElementById("detailText");

playTypingEffect();

const typingText = "ucapan ini dibuat khusus untukmu sayang. emoji hati ini adalah simbol dari rasa cintaku yang tulus, agar setiap hari terasa lebih indah dan penuh cinta.";
const specialMessage = "Selamat ulang tahun, sayang. Terima kasih sudah menjadi alasan hafiz tertawa, bersyukur, dan terus berusaha menjadi yang terbaik. Semoga cinta kita selalu hangat seperti hari ini.";

let typingIndex = 0;
let mediaIndex = 0;

function playTypingEffect() {
  if (!typingIntro) return;

  if (typingIndex < typingText.length) {
    typingIntro.textContent += typingText.charAt(typingIndex);
    typingIndex += 1;
    setTimeout(playTypingEffect, 40);
  } else {
    const cursor = document.createElement("span");
    cursor.className = "typing-cursor";
    cursor.textContent = "|";
    typingIntro.appendChild(cursor);
  }
}

if (mediaCards.length > 0) {
  mediaCards[0].classList.add("active");

  setInterval(() => {
    mediaCards.forEach((card) => card.classList.remove("active"));
    mediaCards[mediaIndex].classList.add("active");
    mediaIndex = (mediaIndex + 1) % mediaCards.length;
  }, 2800);
}

function playDetailTyping() {
  if (!detailText) return;

  detailText.textContent = "";
  let index = 0;

  function typeNextChar() {
    if (index < specialMessage.length) {
      detailText.textContent += specialMessage.charAt(index);
      index += 1;
      setTimeout(typeNextChar, 35);
    } else {
      const cursor = document.createElement("span");
      cursor.className = "typing-cursor";
      cursor.textContent = "|";
      detailText.appendChild(cursor);
    }
  }

  typeNextChar();
}

function createBurst(x, y) {
  const piece = document.createElement("span");
  piece.className = "burst-piece";
  const size = Math.floor(Math.random() * 12) + 8;
  piece.style.width = `${size}px`;
  piece.style.height = `${size}px`;
  piece.style.left = `${x - size / 2}px`;
  piece.style.top = `${y - size / 2}px`;
  piece.style.setProperty("--x", `${(Math.random() - 0.5) * 260}px`);
  piece.style.setProperty("--y", `${(Math.random() - 0.5) * 260}px`);
  piece.style.background = ["#ff7fb3", "#ff4f7d", "#ffd5e7", "#ff94b8", "#ffdac9"][Math.floor(Math.random() * 5)];
  piece.style.borderRadius = `${Math.random() * 50 + 25}%`;
  burstLayer.appendChild(piece);
  setTimeout(() => piece.remove(), 900);
}

function triggerBalloonBurst() {
  const sourceY = window.innerHeight * 0.35;
  const sourceX = window.innerWidth * 0.5;
  for (let i = 0; i < 24; i += 1) {
    const offsetX = (Math.random() - 0.5) * 220;
    const offsetY = (Math.random() - 0.5) * 140;
    createBurst(sourceX + offsetX, sourceY + offsetY);
  }
}

function createFirework(x, y, color) {
  for (let i = 0; i < 16; i += 1) {
    const spark = document.createElement("span");
    spark.className = "firework-piece";
    spark.style.background = color;
    spark.style.left = `${x}px`;
    spark.style.top = `${y}px`;
    spark.style.setProperty("--dx", `${(Math.random() - 0.5) * 280}px`);
    spark.style.setProperty("--dy", `${(Math.random() - 0.5) * 280}px`);
    spark.style.setProperty("--rotate", `${Math.random() * 360}deg`);
    spark.style.animationDuration = `${Math.random() * 0.3 + 0.9}s`;
    burstLayer.appendChild(spark);
    setTimeout(() => spark.remove(), 1200);
  }
}

function triggerFireworks() {
  const colors = ["#ffdf87", "#ff7ea8", "#ffd4e1", "#ffffff"];
  const positions = [
    { x: window.innerWidth * 0.25, y: window.innerHeight * 0.25 },
    { x: window.innerWidth * 0.5, y: window.innerHeight * 0.18 },
    { x: window.innerWidth * 0.75, y: window.innerHeight * 0.28 }
  ];

  positions.forEach((pos, index) => {
    setTimeout(() => {
      createFirework(pos.x, pos.y, colors[index % colors.length]);
    }, index * 180);
  });
}

const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get("burst") === "1") {
  window.addEventListener("load", () => {
    setTimeout(triggerBalloonBurst, 250);
    setTimeout(triggerFireworks, 350);
  });
} else {
  window.addEventListener("load", () => {
    setTimeout(triggerFireworks, 350);
  });
}

revealBtn.addEventListener("click", () => {
  const isOpen = detailSection.classList.toggle("show");
  revealBtn.textContent = isOpen ? "sembunyikan ucapan" : "buka ucapan spesial";

  if (isOpen) {
    playDetailTyping();
    const rect = revealBtn.getBoundingClientRect();
    for (let i = 0; i < 18; i += 1) {
      createBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }
  } else {
    detailText.textContent = "";
  }
});

function addHeart() {
  const heart = document.createElement("span");
  heart.textContent = "💖";
  heart.style.left = `${Math.random() * 90 + 5}%`;
  heart.style.fontSize = `${Math.random() * 1.4 + 1.2}rem`;
  heart.style.animationDuration = `${Math.random() * 1.6 + 3.6}s`;
  heart.style.animationDelay = `${Math.random() * 2}s`;
  floating.appendChild(heart);
  setTimeout(() => heart.remove(), 7000);
}

for (let i = 0; i < 8; i += 1) {
  setTimeout(addHeart, i * 300);
}
setInterval(addHeart, 900);

window.addEventListener("DOMContentLoaded", () => {
  const page = document.querySelector(".page");
  if (page) {
    page.classList.add("page-enter");
  }

  triggerFireworks();

  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("burst") === "1") {
    setTimeout(triggerBalloonBurst, 250);
    setTimeout(triggerFireworks, 350);

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 3;
    for (let i = 0; i < 18; i += 1) {
      setTimeout(() => createBurst(centerX, centerY), i * 45);
    }
  }
});
