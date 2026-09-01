// ===== CINEMATIC INTRO =====
document.body.classList.add("intro-active");
const introScreen = document.getElementById("intro-screen");
const introVideo = document.getElementById("intro-video");
const flash = document.getElementById("lightning-flash");
const introLogo = document.getElementById("intro-logo");
const skipIntro = document.getElementById("skip-intro");
let introStarted = false, introFinished = false, fallbackTimer;
function startLogoReveal(){
  if(introStarted || introFinished) return;
  introStarted=true;
  flash.classList.remove("fire"); void flash.offsetWidth; flash.classList.add("fire");
  setTimeout(()=>introLogo.classList.add("reveal"),110);
  setTimeout(finishIntro,2300);
}
function finishIntro(){
  if(introFinished) return; introFinished=true; clearTimeout(fallbackTimer);
  introScreen.classList.add("fade-out"); document.body.classList.remove("intro-active");
  setTimeout(()=>introScreen.style.display="none",1000);
}
introVideo.addEventListener("ended",startLogoReveal);
introVideo.addEventListener("timeupdate",()=>{
  if(!introStarted && isFinite(introVideo.duration) && introVideo.currentTime >= introVideo.duration-0.15) startLogoReveal();
});
introVideo.addEventListener("loadedmetadata",()=>{ fallbackTimer=setTimeout(startLogoReveal,introVideo.duration*1000+500); });
introVideo.addEventListener("error",()=>setTimeout(startLogoReveal,500));
skipIntro.addEventListener("click",()=>{try{introVideo.pause()}catch(e){} finishIntro();});

// ===== COUNTDOWN =====
// Set the actual symposium date/time here.
const eventDate = new Date("2026-12-20T09:00:00+05:30");

function updateCountdown() {
  const now = new Date();
  const distance = eventDate - now;

  if (distance <= 0) {
    ["days","hours","minutes","seconds"].forEach(id => {
      document.getElementById(id).textContent = "00";
    });
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
