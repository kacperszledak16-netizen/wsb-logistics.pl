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
(function () {

  const SNOW_COUNT = 150;
  const minSize = 12;
  const maxSize = 24;
  const minSpeed = 1;
  const maxSpeed = 5;

  // Wysokość całej strony (nie tylko ekranu)
  const pageHeight = document.documentElement.scrollHeight;

  for (let i = 0; i < SNOW_COUNT; i++) {
    const snow = document.createElement('div');
    snow.classList.add('snowflake');

    // losowy rozmiar
    const size = Math.random() * (maxSize - minSize) + minSize;
    snow.style.fontSize = size + 'px';
    snow.style.opacity = Math.random() * 0.5 + 0.5;

    // pozycja startowa
    snow.style.left = Math.random() * window.innerWidth + 'px';
    snow.style.top = (-10 - Math.random() * 300) + 'px';

    snow.textContent = '❄';
    document.body.appendChild(snow);

    const speed = maxSpeed - size / 10 + Math.random();
    const swayAmplitude = Math.random() * 3 + 1;
    const swayFrequency = Math.random() * 0.05 + 0.01;

    (function fall() {
      let top = parseFloat(snow.style.top);

      // jeśli dotknął dna strony — usuń płatek
      if (top > pageHeight) {
        snow.remove();
        return;
      }

      const sway = Math.sin(top * swayFrequency) * swayAmplitude;
      snow.style.top = (top + speed) + 'px';
      snow.style.left = (parseFloat(snow.style.left) + sway) + 'px';

      requestAnimationFrame(fall);
    })();
  }

})();
