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

