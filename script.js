
// ================= CINEMATIC INTRO =================
const introScreen = document.getElementById("introScreen");
const introVideo = document.getElementById("introVideo");
const lightFlash = document.getElementById("lightFlash");
const logoReveal = document.getElementById("logoReveal");
const skipIntro = document.getElementById("skipIntro");

let introFinished = false;

function finishIntro(skip = false) {
  if (introFinished) return;
  introFinished = true;

  if (skip) {
    introScreen.classList.add("hide");
    document.body.classList.remove("intro-active");
    setTimeout(() => introScreen.remove(), 850);
    return;
  }

  // The supplied intro video ends on the lightning shot.
  // Trigger the flash exactly when the video reaches its end.
  lightFlash.classList.remove("fire");
  void lightFlash.offsetWidth;
  lightFlash.classList.add("fire");

  setTimeout(() => {
    logoReveal.classList.add("show");
  }, 110);

  // Let the revealed logo breathe for a moment, then enter the website.
  setTimeout(() => {
    introScreen.classList.add("hide");
    document.body.classList.remove("intro-active");
    setTimeout(() => introScreen.remove(), 850);
  }, 1900);
}

introVideo.addEventListener("ended", () => finishIntro(false));
skipIntro.addEventListener("click", () => {
  introVideo.pause();
  finishIntro(true);
});

// If the browser blocks autoplay, clicking/tapping the intro still starts it.
introScreen.addEventListener("click", (e) => {
  if (e.target === skipIntro) return;
  if (introVideo.paused && !introFinished) introVideo.play().catch(() => {});
});

// ===================== EDIT THESE VALUES =====================
// Set the actual symposium date/time here.
// Example: new Date("2026-12-20T09:00:00+05:30")
const eventDate = new Date("2026-12-20T09:00:00+05:30");

// ===============================================================

function updateCountdown() {
  const now = new Date();
  const distance = eventDate - now;

  if (distance <= 0) {
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);
