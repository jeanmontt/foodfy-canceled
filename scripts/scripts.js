const modalOverlay = document.querySelector('.modal-overlay');
const cards = document.querySelectorAll('.card');
const modal = document.querySelector('#modal');
const classes = modal.classList;
const modalContent = document.querySelector(".modal-content");


for (let card of cards) {
    card.addEventListener("click", function() {
        const image = card.getAttribute('id');
        const title = card.querySelector("h2").textContent;
        const by = card.querySelector("p").textContent;
        
        modalOverlay.classList.add('active');

        modalContent.querySelector("img").src = `assets/${image}.png`;
        modalContent.querySelector("img").alt = title;
        modalContent.querySelector("h2").textContent = title;
        modalContent.querySelector("p").textContent = by;
    })
};

document.querySelector('.close-modal').addEventListener("click", function() {
    modalOverlay.classList.remove('active');
});