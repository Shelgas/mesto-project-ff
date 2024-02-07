export function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeOnKey);
  document.addEventListener("click", closeModalOverlay);
}

export function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeOnKey);
  document.removeEventListener("click", closeModalOverlay);
}

function closeOnKey(evt) {
  if (evt.key === "Escape") {
    const modalActive = document.querySelector(".popup_is-opened");
    closeModal(modalActive);
  }
}

function closeModalOverlay(evt) {
  if (evt.target.classList.contains("popup_is-opened")) {
    closeModal(evt.target);
  }
}
