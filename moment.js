const momentVideo = document.getElementById("momentVideo");
const momentPage = document.querySelector(".page");

window.addEventListener("DOMContentLoaded", () => {
  if (momentPage) {
    momentPage.classList.add("page-enter");
  }
});

function goToAnimationPage() {
  window.location.href = "index.html?burst=1";
}

function createMerconSpark(overlay, color) {
  const spark = document.createElement("span");
  spark.className = "mercon-spark";
  spark.style.backgroundColor = color;
  const size = Math.random() * 10 + 8;
  const offsetX = (Math.random() - 0.5) * 260;
  const offsetY = (Math.random() - 0.5) * 260;
  spark.style.width = `${size}px`;
  spark.style.height = `${size}px`;
  spark.style.left = "50%";
  spark.style.top = "50%";
  spark.style.setProperty("--tx", `${offsetX}px`);
  spark.style.setProperty("--ty", `${offsetY}px`);
  spark.style.animationDuration = `${Math.random() * 0.6 + 0.9}s`;
  overlay.appendChild(spark);
  return spark;
}

function launchMerconEffect() {
  const overlay = document.createElement("div");
  overlay.className = "mercon-overlay";

  document.body.appendChild(overlay);
  window.scrollTo({ top: 0, behavior: "smooth" });

  const colors = ["#ffd74d", "#ff5f7a", "#ffb9d8", "#ffffff"];
  for (let i = 0; i < 24; i += 1) {
    createMerconSpark(overlay, colors[i % colors.length]);
  }

  setTimeout(() => overlay.classList.add("mercon-hidden"), 700);
  setTimeout(() => {
    overlay.remove();
    goToAnimationPage();
  }, 1200);
}

if (momentVideo) {
  momentVideo.addEventListener("ended", launchMerconEffect);

  const playPromise = momentVideo.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      // Autoplay may be blocked, but video can still be started manually.
    });
  }
}
