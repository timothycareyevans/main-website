const loader = document.getElementById("loader");
const loaderBar = document.getElementById("loaderBar");
const loaderPercent = document.getElementById("loaderPercent");
const particlesContainer = document.getElementById("particles");

function runLoader() {
    let value = 0;
    const timer = setInterval(() => {
        value += 10;
        loaderBar.style.width = `${value}%`;
        loaderPercent.textContent = `${value}%`;

        if (value >= 100) {
            clearInterval(timer);
            loader.classList.add("hidden");
            setTimeout(() => loader.remove(), 450);
        }
    }, 80);
}

function generateParticles() {
    if (!particlesContainer) return;

    const codeSymbols = ["{", "}", "[", "]", "(", ")", "<", ">", "/", "*", "=", "+", "-", ";", ":", "&", "|", "%", "$", "#", "@"];
    for (let i = 0; i < 20; i += 1) {
        const particle = document.createElement("div");
        particle.className = "particle";
        particle.textContent = codeSymbols[Math.floor(Math.random() * codeSymbols.length)];
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 15}s`;
        particle.style.animationDuration = `${10 + Math.random() * 10}s`;
        particlesContainer.appendChild(particle);
    }
}

function initScrollEffects() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");

                entry.target.querySelectorAll(".skill-progress").forEach((bar) => {
                    bar.style.width = bar.getAttribute("data-width");
                });
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    });

    document.querySelectorAll(".fade-in").forEach((element) => observer.observe(element));
}

function initForm() {
    const contactForm = document.getElementById("contactForm");
    if (!contactForm) return;

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();
        alert("Message sent successfully!");
        contactForm.reset();
    });
}

generateParticles();
runLoader();
initScrollEffects();
initForm();
