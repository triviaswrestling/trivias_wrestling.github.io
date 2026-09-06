const menuButton = document.getElementById("menuButton");
const nav = document.querySelector(".navbar nav");

menuButton.addEventListener("click", () => {
    nav.classList.toggle("active");
});
