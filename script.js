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
})();

//  kod śniegu
(function () {
    const SNOW_COUNT = 100;
    const flakes = [];
    const canvasBack = document.createElement('canvas');
    const canvasFront = document.createElement('canvas');
    canvasBack.className = 'snow-canvas back';
    canvasFront.className = 'snow-canvas front';
    document.body.appendChild(canvasBack);
    document.body.appendChild(canvasFront);
    const ctxBack = canvasBack.getContext('2d');
    const ctxFront = canvasFront.getContext('2d');

    function resizeCanvas() {
        canvasBack.width = window.innerWidth;
        canvasBack.height = window.innerHeight;
        canvasFront.width = window.innerWidth;
        canvasFront.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    for (let i = 0; i < SNOW_COUNT; i++) {
        flakes.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            size: Math.random() * 10 + 5,
            speed: Math.random() * 1 + 0.5,
            sway: Math.random() * 50 + 20,
            freq: Math.random() * 0.01 + 0.005,
            layer: i % 2 === 0 ? 'back' : 'front',
            opacity: Math.random() * 0.5 + 0.5
        });
    }

    function draw() {
        ctxBack.clearRect(0, 0, canvasBack.width, canvasBack.height);
        ctxFront.clearRect(0, 0, canvasFront.width, canvasFront.height);

        flakes.forEach(f => {
            f.y += f.speed;
            f.x += Math.sin(f.y * f.freq) * (f.sway * 0.02);

            if (f.y > window.innerHeight + 10) {
                f.y = -10;
                f.x = Math.random() * window.innerWidth;
            }

            const ctx = f.layer === 'back' ? ctxBack : ctxFront;
            const r = f.size / 2;
            const gradient = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, r);
            gradient.addColorStop(0, `rgba(255,255,255,${f.opacity})`);
            gradient.addColorStop(1, 'rgba(255,255,255,0)');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(f.x, f.y, r, 0, Math.PI * 2);
            ctx.fill();
        });

        requestAnimationFrame(draw);
    }

    draw();
})();

