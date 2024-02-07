import "./pages/index.css";
import { initialCards } from "./components/initialCards";
import { openModal, closeModal } from "./components/modal";
import { createCard, deleteCard, handleButtonLike } from "./components/cards";

const placesList = document.querySelector(".places__list");

const popups = document.querySelectorAll(".popup");
const popupEdit = document.querySelector(".popup_type_edit");
const popupCard = document.querySelector(".popup_type_new-card");

const cardAddBtn = document.querySelector(".profile__add-button");
const profileEditBtn = document.querySelector(".profile__edit-button");
const closeBtns = document.querySelectorAll(".popup__close");

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const profileEditForm = document.forms["edit-profile"];
const profileInputName = profileEditForm.elements.name;
const profileInputDesc = profileEditForm.elements.description;

const cardForm = document.forms["new-place"];
const cardInputName = cardForm.elements["place-name"];
const cardInputLink = cardForm.elements.link;

const imagePopup = document.querySelector(".popup_type_image");
const imageLink = imagePopup.querySelector(".popup__image");
const imageDesc = imagePopup.querySelector(".popup__caption");

profileEditBtn.addEventListener("click", (evt) => {
  profileInputName.value = profileName.textContent;
  profileInputDesc.value = profileDescription.textContent;
  openModal(popupEdit);
});
cardAddBtn.addEventListener("click", () => openModal(popupCard));
profileEditForm.addEventListener("submit", handleEditFormSubmit);
cardForm.addEventListener("submit", handleCardFormSubmit);

Array.from(closeBtns).forEach((btn) =>
  btn.addEventListener("click", () => closeModal(btn.closest(".popup")))
);

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileInputName.value;
  profileDescription.textContent = profileInputDesc.value;
  closeModal(popupEdit);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: cardInputName.value,
    link: cardInputLink.value,
  };
  loadImage(cardInputLink.value)
    .then((evt) => {
      placesList.prepend(
        createCard(newCard, deleteCard, handleButtonLike, handleImgPopup)
      );
    })
    .catch(() => {
      console.error("Всё идёт не по плану.");
    });
  evt.target.reset();
  closeModal(popupCard);
}

function handleImgPopup(evt) {
  imageLink.src = evt.target.src;
  imageDesc.textContent = evt.target.alt;
  imageLink.alt = imageDesc.textContent;
  openModal(imagePopup);
}

const renderCards = (cards) => {
  cards.forEach((item) => {
    const cardElement = createCard(
      item,
      deleteCard,
      handleButtonLike,
      handleImgPopup
    );
    placesList.append(cardElement);
  });
};

function loadImage(imageUrl) {
  return new Promise((resolve, reject) => {
    const image = document.createElement("img");
    image.src = imageUrl;
    image.onerror = reject;
    image.onload = resolve;
  });
}

Array.from(popups).forEach((popup) => popup.classList.add("popup_is-animated"));

renderCards(initialCards);
