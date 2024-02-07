import "./pages/index.css";
import { initialCards } from "./components/initialCards";
import { openModal, closeModal } from "./components/modal";
import { createCard, deleteCard } from "./components/cards";

const placesList = document.querySelector(".places__list");

const popup = document.querySelector(".popup");
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
      placesList.prepend(createCard(newCard, deleteCard));
    })
    .catch(() => {
      console.error("Всё идёт не по плану.");
    });
  evt.target.reset();
  closeModal(popupCard);
}

const renderCards = (cards) => {
  cards.forEach((item) => {
    const cardElement = createCard(item, deleteCard);
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

renderCards(initialCards);
