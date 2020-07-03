//redirecionar usuário para page receitas/:index
const cards = document.querySelectorAll('.card');

for (let card of cards) {
    card.addEventListener("click", function(){
        pageIndex = card.getAttribute('id');

        window.location.href = `/receitas/${pageIndex}`;
    })
};

//mostrar/esconder #content page recipe
const content = document.querySelector('#content');
const buttons = content.querySelectorAll('a');
const texts = content.querySelectorAll(".text");

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function() {
        if (texts[i].classList.contains("hidden")) {
            texts[i].classList.remove("hidden");
            buttons[i].innerHTML = "ESCONDER";
        } else {
            texts[i].classList.add("hidden");
            buttons[i].innerHTML = "MOSTRAR";
        }
    })
};