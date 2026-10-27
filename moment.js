const momentVideo = document.getElementById("momentVideo");
const momentPage = document.querySelector(".page");

window.addEventListener("DOMContentLoaded", () => {
  if (momentPage) {
    momentPage.classList.add("page-enter");
  }

  if (momentVideo) {
    momentVideo.muted = true;
    momentVideo.loop = false;
    momentVideo.playsInline = true;
    momentVideo.autoplay = true;
    momentVideo.addEventListener("ended", () => {
      window.location.href = "after-moment.html";
    }, { once: true });

    const playPromise = momentVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
      // Browser memblokir autoplay tanpa interaksi; video tetap akan berputar saat user berinteraksi.
      });
    }
  }
});
