const linkCaraDeBarro = document.querySelector("#abrir-modal-cara-de-barro");
const modalCaraDeBarro = document.querySelector("#modal-filme");

if (!(linkCaraDeBarro instanceof HTMLAnchorElement)
    || !(modalCaraDeBarro instanceof HTMLDialogElement)) {
    throw new Error("O link ou o dialog de Cara-de-Barro não foi encontrado.");
}

const botaoFecharModal = modalCaraDeBarro.querySelector(".modal-filme-fechar");
const trailerCaraDeBarro = modalCaraDeBarro.querySelector("iframe[data-src]");

if (!(botaoFecharModal instanceof HTMLButtonElement) || !(trailerCaraDeBarro instanceof HTMLIFrameElement)) {
    throw new Error("O botão de fechar ou o trailer de Cara-de-Barro não foi encontrado.");
}

linkCaraDeBarro.addEventListener("click", (event) => {
    event.preventDefault();
    trailerCaraDeBarro.src = trailerCaraDeBarro.dataset.src;
    modalCaraDeBarro.showModal();
    botaoFecharModal.focus();
});

botaoFecharModal.addEventListener("click", () => {
    modalCaraDeBarro.close();
});

modalCaraDeBarro.addEventListener("click", (event) => {
    if (event.target === modalCaraDeBarro) {
        modalCaraDeBarro.close();
    }
});

modalCaraDeBarro.addEventListener("close", () => {
    trailerCaraDeBarro.removeAttribute("src");
});
