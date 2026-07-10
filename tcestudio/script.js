const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-button");
const navMenu = document.querySelector("#navMenu");

function syncHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 120);
}

menuButton.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  menuButton.classList.toggle("is-open", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

window.addEventListener("scroll", syncHeader, { passive: true });
syncHeader();
