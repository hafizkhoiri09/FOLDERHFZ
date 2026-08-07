const momentVideo = document.getElementById("momentVideo");
const momentPage = document.querySelector(".page");

window.addEventListener("DOMContentLoaded", () => {
  if (momentPage) {
    momentPage.classList.add("page-enter");
  }
});

function goToAnimationPage() {
  window.location.href = "after-moment.html";
}

if (momentVideo) {
  momentVideo.addEventListener("ended", goToAnimationPage);
  momentVideo.muted = false;
  momentVideo.volume = 1;

  const playPromise = momentVideo.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      // Autoplay with sound may be blocked by browser policies.
    });
  }
}
