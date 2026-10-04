"use strict";

// Typing effect
const roles = ["DEVELOPER", "DESIGNER", "AI/ML DEV"];
const typingEl = document.getElementById("typing-text");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (typingEl && !reduceMotion) {
  let roleIndex = 0, charIndex = 0, deleting = false;

  const type = () => {
    const word = roles[roleIndex];
    charIndex += deleting ? -1 : 1;
    typingEl.textContent = word.slice(0, charIndex);

    let delay = deleting ? 50 : 110;
    if (!deleting && charIndex === word.length) {
      deleting = true;
      delay = 1600;
    } else if (deleting && charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 350;
    }
    setTimeout(type, delay);
  };
  type();
}

// Nav: solid background after scrolling
const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Nav: highlight the link of the section in view
const links = document.querySelectorAll(".nav-links a");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    links.forEach((a) =>
      a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`)
    );
  });
}, { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("main section[id]").forEach((s) => observer.observe(s));

// Footer year
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// Particle network background
const canvas = document.getElementById("bg");
if (canvas && !reduceMotion) {
  const ctx = canvas.getContext("2d");
  let w, h, dots;

  const init = () => {
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;
    const count = Math.min(70, Math.floor(w / 18));
    dots = Array.from({ length: count }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
    }));
  };

  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    dots.forEach((a, i) => {
      a.x = (a.x + a.vx + w) % w;
      a.y = (a.y + a.vy + h) % h;
      ctx.fillStyle = "rgba(124,156,255,0.7)";
      ctx.beginPath(); ctx.arc(a.x, a.y, 1.6, 0, Math.PI * 2); ctx.fill();
      for (let j = i + 1; j < dots.length; j++) {
        const b = dots[j], d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 130) {
          ctx.strokeStyle = `rgba(124,156,255,${0.18 * (1 - d / 130)})`;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
    });
    requestAnimationFrame(draw);
  };

  addEventListener("resize", init);
  init();
  draw();
}
