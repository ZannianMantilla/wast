// === Referencias ===
const btn = document.getElementById("continueBtn");
const card = document.getElementById("card");
const dinoContainer = document.getElementById("dinoContainer");
const dino1 = document.getElementById("dinosaurio1");
const dino2 = document.getElementById("dinosaurio2");
const billScene = document.getElementById("billScene");
const billGif = document.querySelector(".bill-gif");
const textPanel = document.getElementById("textPanel");
const typedText = document.getElementById("typedText");
const pageIndicator = document.getElementById("pageIndicator");
const audio1 = document.getElementById("audio1");
const cakeScene = document.getElementById("cakeScene");
const finalMessage = document.getElementById("finalMessage");

const billCipherTexts = [
  `So today’s your birthday, huh, María?
What a name… so painfully ordinary, so human.
It sounds like someone who follows`,

  `the rules,
who celebrates with cake and those ridiculous little songs.

But… Wast…
Ah, now that’s a name with spark!`,

  `It has chaos, it has echo, it has the power to shatter realities.
Wast sounds like a glitch in the system,`,

  `a crack in the simulation,
a reversed melody the gods pretend not to hear.

So tell me… why be “María,”`,

  `when you can be Wast—
the variable that algorithms can’t predict? 🔺`
];

const voiceFiles = ["voz1.mp3", "voz2.mp3", "voz3.mp3", "voz4.mp3", "voz5.mp3"];

// Inicia secuencia
btn.addEventListener("click", () => {
  gsap.to(card, {
    opacity: 0,
    duration: 1,
    onComplete: () => {
      card.style.display = "none";
      btn.style.display = "none";
      dinoContainer.classList.remove("hidden");

      audio1.play();
      gsap.fromTo(dino1, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 1 });
      gsap.fromTo(dino2, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 1, delay: 0.3 });

      setTimeout(() => {
        gsap.to([dino1, dino2], { opacity: 0, scale: 0, duration: 1 });
        setTimeout(() => startBillScene(), 1000);
      }, 3000);
    },
  });
});

// Escena Bill Cipher
function startBillScene() {
  dinoContainer.classList.add("hidden");
  billScene.classList.remove("hidden");
  gsap.to(billGif, { opacity: 1, scale: 1, duration: 1 });

  setTimeout(() => {
    textPanel.classList.remove("hidden");
    playSequence();
  }, 1000);
}

// Audio + texto sincronizado
async function playSequence() {
  for (let i = 0; i < voiceFiles.length; i++) {
    const audio = new Audio(voiceFiles[i]);
    pageIndicator.textContent = `Fragmento ${i + 1}/${voiceFiles.length}`;
    typedText.textContent = "";

    await playAudioAndType(audio, billCipherTexts[i]);
    if (i < voiceFiles.length - 1) await wait(1200);
  }
  endSequence();
}

function playAudioAndType(audio, text) {
  return new Promise((resolve) => {
    let i = 0;
    const delay = 35;
    const interval = setInterval(() => {
      if (i < text.length) {
        typedText.textContent += text.charAt(i);
        i++;
      }
    }, delay);
    audio.play();
    audio.addEventListener("ended", () => {
      clearInterval(interval);
      resolve();
    });
  });
}

function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// Termina Bill y pasa al pastel
function endSequence() {
  gsap.to(billScene, {
    opacity: 0,
    duration: 1,
    onComplete: () => {
      billScene.classList.add("hidden");
      startCakeScene();
    },
  });
}

// Escena del pastel 🎂
function startCakeScene() {
  cakeScene.classList.remove("hidden");
  gsap.fromTo(cakeScene, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1 });

  // Inicia confetti y audio
  launchConfetti();
  const gatoAudio = new Audio("gato.mp3");
  gatoAudio.play();

  gatoAudio.addEventListener("ended", () => {
    gsap.fromTo(finalMessage, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1 });
    finalMessage.classList.remove("hidden");
  });
}

// Confetti 🎉
function launchConfetti() {
  const duration = 5000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({ particleCount: 6, angle: 60, spread: 55, origin: { x: 0 } });
    confetti({ particleCount: 6, angle: 120, spread: 55, origin: { x: 1 } });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}
