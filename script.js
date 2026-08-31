/* ============================================================
   💌 PERSONALIZATION — edit everything here, nothing else needed
   ============================================================ */
const birthdayConfig = {
  name: "Drodul Wangmo",

  openingMessage: "I made something for you.",

  loveLetter: `Drodul,

Today is your birthday, but somehow I feel like I'm the lucky one — because I get to have you in my life.

I don't know if words will ever be enough to explain how much you mean to me, but I hope this little surprise reminds you just how special you are.

Thank you for all the smiles, the little moments, the memories, and simply for being you.

I hope this new year of your life brings you endless happiness, beautiful moments, and everything your heart wishes for.

Happy Birthday to the girl who holds a very special place in my heart. ❤️`,

  finalMessage: `I hope you always keep that beautiful smile.

I hope you always remember how loved you are.

I hope this year gives you countless reasons to laugh, dream, and be happy.

And wherever life takes us, I hope we continue making beautiful memories together.

Thank you for being you.
And Don't forget that you are a Aunt now but i still love you love you love you LOVE YOU SOOOOOO MUCHHHHHH, MORE THAN EVERRRR.

Happy Birthday, Drodul.

❤️`,

  reasons: [
    { emoji: "❤️", text: "Your smile" },
    { emoji: "🌙", text: "The comfort I feel around you" },
    { emoji: "✨", text: "The way you make ordinary moments special" },
    { emoji: "😂", text: "Your adorable laugh" },
    { emoji: "🌹", text: "The little things you do" },
    { emoji: "💫", text: "The person you are" },
    { emoji: "❤️", text: "The way you make me feel loved" },
  ],

  // Replace src with your own photos in assets/images/. Add or remove entries freely.
  photos: [
    {
      src: "assets/images/photo1.jpg",
      caption: "One of my favorite moments with you ❤️",
    },
    { src: "assets/images/photo2.jpg", caption: "A memory I'll always keep." },
    { src: "assets/images/photo3.jpg", caption: "That smile..." },
    { src: "assets/images/photo4.jpg", caption: "Us. ❤️" },
  ],

  whispers: [
    "You make my world brighter. ❤️",
    "My favorite person.",
    "Just you.",
    "Always you.",
    "One heart. One beautiful girl.",
  ],

  music: "assets/music/birthday-song.mp3",
};

/* ============================================================
   UTILITIES
   ============================================================ */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
const rand = (min, max) => Math.random() * (max - min) + min;

/* ============================================================
   AMBIENT BACKGROUND CANVAS — stars, fireflies, glowing particles
   ============================================================ */
(function ambientCanvas() {
  const canvas = $("#bg-canvas");
  const ctx = canvas.getContext("2d");
  let w,
    h,
    stars = [],
    fireflies = [];
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight * 3; // covers scroll depth visually via fixed positioning
    h = canvas.height = window.innerHeight;
  }

  function initStars() {
    const count = window.innerWidth < 600 ? 60 : 120;
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: rand(0.4, 1.6),
      baseAlpha: rand(0.2, 0.9),
      phase: rand(0, Math.PI * 2),
      speed: rand(0.005, 0.02),
    }));

    const fCount = window.innerWidth < 600 ? 8 : 14;
    fireflies = Array.from({ length: fCount }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: rand(-0.15, 0.15),
      vy: rand(-0.1, 0.1),
      r: rand(1.2, 2.4),
      phase: rand(0, Math.PI * 2),
    }));
  }

  function draw(t) {
    ctx.clearRect(0, 0, w, h);
    // stars
    for (const s of stars) {
      const a = s.baseAlpha * (0.6 + 0.4 * Math.sin(t * s.speed + s.phase));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(250,243,234,${a})`;
      ctx.fill();
    }
    // fireflies (warm glowing particles)
    for (const f of fireflies) {
      f.x += f.vx;
      f.y += f.vy;
      if (f.x < 0) f.x = w;
      if (f.x > w) f.x = 0;
      if (f.y < 0) f.y = h;
      if (f.y > h) f.y = 0;
      const a = 0.5 + 0.5 * Math.sin(t * 0.002 + f.phase);
      const grad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, 10);
      grad.addColorStop(0, `rgba(217,181,121,${0.8 * a})`);
      grad.addColorStop(1, "rgba(217,181,121,0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(f.x, f.y, 10, 0, Math.PI * 2);
      ctx.fill();
    }
    if (!reduceMotion) requestAnimationFrame(draw);
  }

  resize();
  initStars();
  window.addEventListener("resize", () => {
    resize();
    initStars();
  });
  requestAnimationFrame(draw);
  if (reduceMotion) draw(0);
})();

/* ============================================================
   EFFECT HELPERS — hearts / confetti / sparks / fireworks
   ============================================================ */
const heartsLayer = $("#hearts-layer");
const confettiLayer = $("#confetti-layer");
const fireworksLayer = $("#fireworks-layer");
const confettiColors = ["#d97a95", "#d9b579", "#8c1f3f", "#f3c9d4", "#faf3ea"];

function spawnHearts(count = 14, layer = heartsLayer) {
  for (let i = 0; i < count; i++) {
    const el = document.createElement("span");
    el.className = "fx-heart";
    el.textContent = "❤";
    el.style.left = rand(2, 96) + "vw";
    el.style.setProperty("--drift", rand(-60, 60) + "px");
    el.style.setProperty("--rot", rand(-40, 40) + "deg");
    el.style.fontSize = rand(0.9, 1.9) + "rem";
    el.style.animationDuration = rand(3.2, 5.5) + "s";
    el.style.animationDelay = rand(0, 0.6) + "s";
    layer.appendChild(el);
    el.addEventListener("animationend", () => el.remove());
  }
}

function spawnConfetti(count = 40) {
  for (let i = 0; i < count; i++) {
    const el = document.createElement("span");
    el.className = "fx-confetti";
    el.style.left = rand(0, 100) + "vw";
    el.style.background =
      confettiColors[Math.floor(Math.random() * confettiColors.length)];
    el.style.setProperty("--rot", rand(180, 720) + "deg");
    el.style.animationDuration = rand(2.6, 4.4) + "s";
    el.style.animationDelay = rand(0, 0.5) + "s";
    el.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
    confettiLayer.appendChild(el);
    el.addEventListener("animationend", () => el.remove());
  }
}

function spawnFirework(cx, cy, layer = fireworksLayer) {
  const sparkCount = 26;
  for (let i = 0; i < sparkCount; i++) {
    const angle = (Math.PI * 2 * i) / sparkCount + rand(-0.1, 0.1);
    const dist = rand(60, 140);
    const el = document.createElement("span");
    el.className = "fx-spark";
    el.style.left = cx + "px";
    el.style.top = cy + "px";
    el.style.setProperty("--sx", Math.cos(angle) * dist + "px");
    el.style.setProperty("--sy", Math.sin(angle) * dist + "px");
    el.style.setProperty("--dur", rand(700, 1100) + "ms");
    layer.appendChild(el);
    el.addEventListener("animationend", () => el.remove());
  }
}

function fireworksShow(bursts = 4) {
  for (let i = 0; i < bursts; i++) {
    setTimeout(() => {
      const x = rand(window.innerWidth * 0.2, window.innerWidth * 0.8);
      const y = rand(window.innerHeight * 0.15, window.innerHeight * 0.5);
      spawnFirework(x, y);
    }, i * 380);
  }
}

/* ============================================================
   OPENING SEQUENCE
   ============================================================ */
(function openingSequence() {
  const lines = $$(".line");
  const button = $("#open-surprise");
  let delay = 600;

  lines.forEach((line, i) => {
    setTimeout(() => line.classList.add("visible"), delay);
    delay += 1500;
  });
  setTimeout(() => button.classList.add("visible"), delay);

  button.addEventListener(
    "click",
    () => {
      spawnHearts(18);
      unlockMusic();
      $("#opening").classList.add("opened");
      setTimeout(() => {
        $("#opening").style.display = "none";
        $("#reveal").scrollIntoView({ behavior: "smooth" });
        runRevealSequence();
      }, 900);
    },
    { once: true },
  );
})();

/* ============================================================
   BIRTHDAY REVEAL SEQUENCE (triggered after opening tap)
   ============================================================ */
function runRevealSequence() {
  const items = $$(".reveal-line, .reveal-title, .reveal-name, .scroll-cue");
  let delay = 300;
  items.forEach((el) => {
    setTimeout(() => {
      el.classList.add("visible");
      if (el.classList.contains("reveal-name")) {
        spawnConfetti(45);
        spawnHearts(20);
        fireworksShow(3);
      }
    }, delay);
    delay += 1000;
  });
}

/* ============================================================
   TYPEWRITER EFFECT (used for the love letter + final message)
   ============================================================ */
function typewrite(el, text, speed = 22) {
  return new Promise((resolve) => {
    let i = 0;
    el.textContent = "";
    const cursor = document.createElement("span");
    cursor.className = "typed-cursor";
    cursor.textContent = "\u00A0";

    function step() {
      if (i <= text.length) {
        el.textContent = text.slice(0, i);
        el.appendChild(cursor);
        i++;
        setTimeout(step, speed);
      } else {
        cursor.remove();
        resolve();
      }
    }
    step();
  });
}

/* ============================================================
   BUILD MEMORIES TRACK
   ============================================================ */
(function buildMemories() {
  const track = $("#memory-track");
  birthdayConfig.photos.forEach((photo, i) => {
    const card = document.createElement("div");
    card.className = "memory-card";
    card.style.setProperty("--tilt", i % 2 === 0 ? "-3deg" : "3deg");
    card.innerHTML = `
      <img src="${photo.src}" alt="${photo.caption}" loading="lazy"
           onerror="this.closest('.memory-card').style.display='none'">
      <p class="caption">${photo.caption}</p>
    `;
    track.appendChild(card);
  });
})();

/* ============================================================
   BUILD REASONS GRID
   ============================================================ */
(function buildReasons() {
  const grid = $("#reasons-grid");
  birthdayConfig.reasons.forEach((r) => {
    const card = document.createElement("div");
    card.className = "reason-card";
    card.innerHTML = `<span class="emoji">${r.emoji}</span>${r.text}`;
    grid.appendChild(card);
  });
})();

/* ============================================================
   SCROLL REVEAL (IntersectionObserver)
   ============================================================ */
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;

      if (el.classList.contains("reveal-on-scroll")) {
        el.classList.add("in-view");
      }

      if (el.id === "letter" && !el.dataset.typed) {
        el.dataset.typed = "1";
        typewrite($("#love-message"), birthdayConfig.loveLetter, 18);
      }

      if (el.classList.contains("reason-card")) {
        el.classList.add("visible");
      }

      if (el.id === "reasons-outro-1" || el.id === "reasons-outro-2") {
        setTimeout(
          () => el.classList.add("visible"),
          el.id.endsWith("2") ? 500 : 0,
        );
      }

      if (el.classList.contains("secret-line")) {
        el.classList.add("visible");
      }

      io.unobserve(el);
    });
  },
  { threshold: 0.35 },
);

$$(".reveal-on-scroll").forEach((el) => io.observe(el));
$$(".reason-card").forEach((el) => io.observe(el));
[$("#reasons-outro-1"), $("#reasons-outro-2")].forEach((el) => io.observe(el));
$$(".secret-line").forEach((el) => io.observe(el));

/* ============================================================
   FINAL SECTION SEQUENCE
   ============================================================ */
const finalObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || entry.target.dataset.done) return;
      entry.target.dataset.done = "1";
      let delay = 300;
      $$(".final-line").forEach((line) => {
        setTimeout(() => line.classList.add("visible"), delay);
        delay += 1300;
      });
      setTimeout(async () => {
        await typewrite($("#final-message"), birthdayConfig.finalMessage, 20);
        setTimeout(() => {
          $(".i-love-you").classList.add("visible");
          spawnHearts(24);
          spawnConfetti(30);
        }, 400);
      }, delay);
      finalObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.3 },
);
finalObserver.observe($("#final"));

/* ============================================================
   SECRET GIFT BOX
   ============================================================ */
$("#gift-box").addEventListener(
  "click",
  function () {
    this.classList.add("opened");
    const rect = this.getBoundingClientRect();
    spawnFirework(rect.left + rect.width / 2, rect.top + rect.height / 2);
    spawnHearts(22);
    spawnConfetti(50);
    fireworksShow(4);
    $(".gift-caption").textContent =
      "A little piece of my heart, made just for you. ❤️";
  },
  { once: true },
);

/* ============================================================
   MUSIC CONTROL
   ============================================================ */
const musicBtn = $("#music-toggle");
const audio = $("#bg-music");
let musicUnlocked = false;

function unlockMusic() {
  if (musicUnlocked) return;
  musicUnlocked = true;
  audio.src = birthdayConfig.music;
  musicBtn.disabled = false;
  audio
    .play()
    .then(() => {
      musicBtn.classList.add("playing");
      musicBtn.querySelector(".music-icon").textContent = "♪";
      musicBtn.setAttribute("aria-label", "Pause music");
    })
    .catch(() => {
      // Autoplay blocked or file missing — site still works fine without it.
      musicBtn.classList.remove("playing");
    });
}

musicBtn.addEventListener("click", () => {
  if (!musicUnlocked) return;
  if (audio.paused) {
    audio.play().catch(() => {});
    musicBtn.classList.add("playing");
    musicBtn.setAttribute("aria-label", "Pause music");
  } else {
    audio.pause();
    musicBtn.classList.remove("playing");
    musicBtn.setAttribute("aria-label", "Play music");
  }
});

audio.addEventListener("error", () => {
  // Missing/broken music file: fail silently, rest of site is unaffected.
  musicBtn.disabled = true;
});

/* ============================================================
   FLOATING WHISPER PHRASES WHILE SCROLLING
   ============================================================ */
(function whisperPhrases() {
  const whisperEl = $("#whisper");
  let lastShown = 0;
  let ticking = false;

  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const now = Date.now();
        if (now - lastShown > 9000 && Math.random() < 0.12) {
          lastShown = now;
          const phrase =
            birthdayConfig.whispers[
              Math.floor(Math.random() * birthdayConfig.whispers.length)
            ];
          whisperEl.textContent = phrase;
          whisperEl.classList.add("show");
          setTimeout(() => whisperEl.classList.remove("show"), 3200);
        }
        ticking = false;
      });
    },
    { passive: true },
  );
})();

/* ============================================================
   Populate the hero name from config (kept in sync with markup)
   ============================================================ */
(function syncName() {
  const heroName = $("#hero-name");
  if (heroName) heroName.textContent = `${birthdayConfig.name} ❤️`;
})();
