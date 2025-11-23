/* DARK MODE */
const slider = document.getElementById("darkmode-slider");
const icon = slider.querySelector(".icon");

// ustawienie początkowego stanu
if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark");
    slider.classList.add("dark");
    icon.textContent = "☀️";
    icon.style.left = "calc(100% - 22px)";
}

// kliknięcie suwaka
slider.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    slider.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        icon.textContent = "☀️";
        icon.style.left = "calc(100% - 22px)";
        localStorage.setItem("theme", "dark");
    } else {
        icon.textContent = "🌙";
        icon.style.left = "2px";
        localStorage.setItem("theme", "light");
    }
});



/* MOBILE MENU */
document.querySelector(".menu-toggle").addEventListener("click", ()=>{
    document.querySelector(".nav-links").classList.toggle("open");
});

/* LIGHTBOX */
const gallery = document.querySelectorAll(".gallery-grid img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = lightbox.querySelector("img");

gallery.forEach(img => {
    img.addEventListener("click", ()=>{
        lightbox.classList.add("active");
        lightboxImg.src = img.src;
    });
});

lightbox.addEventListener("click", ()=>{
    lightbox.classList.remove("active");
});
//snieg//
// snow-bg.js
// Dwuwarstwowy, zoptymalizowany śnieg na canvas (pod treścią, nad tłem)

(function () {
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection || {};
  const saveData = connection.saveData === true;

  if (prefersReducedMotion || saveData) {
    console.info('Snow background disabled or reduced due to user preferences.');
    return;
  }

  const CONFIG = {
    baseCount: 150,
    smallScreenFactor: 0.35,
    medScreenFactor: 0.6,
    lgScreenFactor: 0.9,
    backLayerRatio: 0.55,
    depthBlur: true
  };

  const canvasBack = document.createElement('canvas');
  const canvasFront = document.createElement('canvas');

  canvasBack.className = 'snow-canvas back';
  canvasFront.className = 'snow-canvas front';

  // Dodaj canvasy do body
  document.body.appendChild(canvasBack);
  document.body.appendChild(canvasFront);

  const ctxBack = canvasBack.getContext('2d');
  const ctxFront = canvasFront.getContext('2d');

  let flakesBack = [];
  let flakesFront = [];
  let DPR = Math.max(1, window.devicePixelRatio || 1);

  function computeCounts() {
    const w = window.innerWidth;
    const base = CONFIG.baseCount;
    if (w < 480) return Math.round(base * CONFIG.smallScreenFactor);
    if (w < 768) return Math.round(base * CONFIG.medScreenFactor);
    if (w < 1200) return Math.round(base * CONFIG.lgScreenFactor);
    return base;
  }

  function initCanvasSize() {
    DPR = Math.max(1, window.devicePixelRatio || 1);
    const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    canvasBack.width = Math.floor(w * DPR);
    canvasBack.height = Math.floor(h * DPR);
    canvasFront.width = Math.floor(w * DPR);
    canvasFront.height = Math.floor(h * DPR);

    canvasBack.style.width = w + 'px';
    canvasBack.style.height = h + 'px';
    canvasFront.style.width = w + 'px';
    canvasFront.style.height = h + 'px';

    ctxBack.setTransform(DPR, 0, 0, DPR, 0, 0);
    ctxFront.setTransform(DPR, 0, 0, DPR, 0, 0);
  }

  function createFlake(layer, w, h) {
    const isBack = layer === 'back';
    const sizeRange = isBack ? [6, 14] : [12, 28];
    const speedRange = isBack ? [0.2, 0.9] : [0.9, 3.0];
    const size = Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0];
    const speed = Math.random() * (speedRange[1] - speedRange[0]) + speedRange[0];
    const x = Math.random() * w;
    const y = Math.random() * -h;
    const swayAmp = (isBack ? (Math.random() * 8 + 4) : (Math.random() * 20 + 8));
    const swayFreq = Math.random() * 0.006 + 0.002;
    const opacity = isBack ? (Math.random() * 0.35 + 0.25) : (Math.random() * 0.45 + 0.5);
    return { x, y, size, speed, swayAmp, swayFreq, opacity, layer };
  }

  function populateFlakes() {
    flakesBack = [];
    flakesFront = [];
    const total = computeCounts();
    const backCount = Math.round(total * CONFIG.backLayerRatio);
    const frontCount = total - backCount;
    const w = window.innerWidth;
    const h = window.innerHeight;

    for (let i = 0; i < backCount; i++) flakesBack.push(createFlake('back', w, h));
    for (let i = 0; i < frontCount; i++) flakesFront.push(createFlake('front', w, h));
  }

  function drawFlake(ctx, f) {
    const r = f.size / 2;
    const x = f.x;
    const y = f.y;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, `rgba(255,255,255,${f.opacity})`);
    g.addColorStop(0.6, `rgba(255,255,255,${f.opacity * 0.7})`);
    g.addColorStop(1, `rgba(255,255,255,0)`);
    ctx.beginPath();
    ctx.fillStyle = g;
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  let last = performance.now();
  function animate(now) {
    const dt = Math.min(40, now - last);
    last = now;
    const w = window.innerWidth;
    const h = window.innerHeight;

    ctxBack.clearRect(0, 0, w, h);
    ctxFront.clearRect(0, 0, w, h);

    for (let i = 0; i < flakesBack.length; i++) {
      const f = flakesBack[i];
      f.y += f.speed * (dt / 16);
      f.x += Math.sin(f.y * f.swayFreq) * (f.swayAmp * 0.02) * (dt / 16);
      if (f.y - f.size > h) {
        f.y = - (Math.random() * 80 + 20);
        f.x = Math.random() * w;
      }
      drawFlake(ctxBack, f);
    }

    for (let i = 0; i < flakesFront.length; i++) {
      const f = flakesFront[i];
      f.y += f.speed * (dt / 16);
      f.x += Math.sin(f.y * f.swayFreq) * (f.swayAmp * 0.03) * (dt / 16);
      if (f.y - f.size > h) {
        f.y = - (Math.random() * 120 + 40);
        f.x = Math.random() * w;
      }
      drawFlake(ctxFront, f);
    }

    if (CONFIG.depthBlur) {
      ctxBack.globalCompositeOperation = 'lighter';
      ctxBack.globalAlpha = 0.025;
      for (let i = 0; i < Math.min(30, flakesBack.length); i++) {
        const f = flakesBack[(i * 97) % flakesBack.length];
        ctxBack.beginPath();
        ctxBack.arc(f.x, f.y, f.size * 1.6, 0, Math.PI * 2);
        ctxBack.fillStyle = 'white';
        ctxBack.fill();
      }
      ctxBack.globalAlpha = 1;
      ctxBack.globalCompositeOperation = 'source-over';
    }

    requestAnimationFrame(animate);
  }

  let resizeTimeout;
  function handleResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      initCanvasSize();
      populateFlakes();
    }, 150);
  }

  function initCanvasSize() {
    DPR = Math.max(1, window.devicePixelRatio || 1);
    const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    canvasBack.width = Math.floor(w * DPR);
    canvasBack.height = Math.floor(h * DPR);
    canvasFront.width = Math.floor(w * DPR);
    canvasFront.height = Math.floor(h * DPR);
    canvasBack.style.width = w + 'px';
    canvasBack.style.height = h + 'px';
    canvasFront.style.width = w + 'px';
    canvasFront.style.height = h + 'px';
    ctxBack.setTransform(DPR, 0, 0, DPR, 0, 0);
    ctxFront.setTransform(DPR, 0, 0, DPR, 0, 0);
  }

  // start
  initCanvasSize();
  populateFlakes();
  requestAnimationFrame(animate);

  window.addEventListener('resize', handleResize);
  window.addEventListener('orientationchange', handleResize);

  // API to stop snow
  window.__snowBg = {
    stop: function () {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      canvasBack.remove();
      canvasFront.remove();
    }
  };

})();
})();

