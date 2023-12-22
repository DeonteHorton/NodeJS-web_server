const modal = document.getElementById("dialog");
const openModalButton = document.getElementById("openModal");
const closeModalButton = document.getElementById("closeModal");

openModalButton.addEventListener("click", () => {
    modal.showModal();
});

closeModalButton.addEventListener("click", () => {
    modal.close();
});