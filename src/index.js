import "./pages/index.css";
import {
  getAutorInformation,
  getCards,
  updateProfile,
  addNewCard,
  deleteCard,
  editAvatar,
} from "./components/api";
import { openModal, closeModal } from "./components/modal";
import { createCard } from "./components/card";
import {
  enableValidation,
  validationConfig,
  clearValidation,
} from "./components/validation";
import { bootProcess } from "./components/utils";

const placesList = document.querySelector(".places__list");

const popups = document.querySelectorAll(".popup");
const popupEdit = document.querySelector(".popup_type_edit");
const popupCard = document.querySelector(".popup_type_new-card");
const popupAvatar = document.querySelector(".popup_type_avatar");
const popupCardDelete = document.querySelector(".popup_type_delete");

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

const profileAvatar = document.querySelector(".profile__image");
const avatarForm = document.forms["new-avatar"];
const avatarInputLink = avatarForm.elements.link;

const imagePopup = document.querySelector(".popup_type_image");
const imageLink = imagePopup.querySelector(".popup__image");
const imageDesc = imagePopup.querySelector(".popup__caption");

const deleteForm = document.forms["delete-avatar"];

const autor = {
  name: profileName.textContent,
  description: profileDescription.textContent,
};

let chosenCard = {};

profileEditBtn.addEventListener("click", handleClickEdit);
cardAddBtn.addEventListener("click", handleClickAddCard);
profileAvatar.addEventListener("click", handleChangeAvatar);
profileEditForm.addEventListener("submit", handleEditFormSubmit);
cardForm.addEventListener("submit", handleCardFormSubmit);
avatarForm.addEventListener("submit", handleNewAvatar);
deleteForm.addEventListener("submit", handleDeleteCard);

Array.from(closeBtns).forEach((btn) =>
  btn.addEventListener("click", () => closeModal(btn.closest(".popup")))
);

function handleClickEdit() {
  clearValidation(profileEditForm, validationConfig);
  profileInputName.value = profileName.textContent;
  profileInputDesc.value = profileDescription.textContent;
  openModal(popupEdit);
}

function handleEditFormSubmit(evt) {
  bootProcess(profileEditForm, true);
  evt.preventDefault();
  updateProfile(profileInputName.value, profileInputDesc.value)
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
    })
    .then(() => {
      bootProcess(profileEditForm, false);
      closeModal(popupEdit);
    })
    .catch((err) => console.log(err));
}

function handleNewAvatar(evt) {
  evt.preventDefault();
  bootProcess(avatarForm, true);
  editAvatar(avatarInputLink.value)
    .then((data) => {
      profileAvatar.style.backgroundImage = `url(${data.avatar})`;
    })
    .then(() => {
      bootProcess(avatarForm, false);
      closeModal(popupAvatar);
      evt.target.reset();
    })
    .catch((err) => console.log(err));

  closeModal(popupAvatar);
}

function handleChangeAvatar() {
  clearValidation(avatarForm, validationConfig);
  avatarForm.reset();
  openModal(popupAvatar);
}

function handleClickAddCard() {
  clearValidation(cardForm, validationConfig);
  cardForm.reset();
  openModal(popupCard);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  bootProcess(cardForm, true);
  const newCard = {
    name: cardInputName.value,
    link: cardInputLink.value,
  };
  addNewCard(newCard)
    .then((data) => {
      placesList.prepend(
        createCard(
          data,
          handleDeleteCardQuestion,
          handleImgPopup,
          autor.id
        )
      );
    })
    .then(() => {
      bootProcess(cardForm, false);
      closeModal(popupCard);
      evt.target.reset();
    })
    .catch((err) => console.log(err));
}

function handleImgPopup(evt) {
  imageLink.src = evt.target.src;
  imageDesc.textContent = evt.target.alt;
  imageLink.alt = imageDesc.textContent;
  openModal(imagePopup);
}



function handleDeleteCardQuestion(evt, cardId, cardElement) {
  evt.preventDefault();
  openModal(popupCardDelete);
  chosenCard = {
    id: cardId,
    item: cardElement,
  };
}

function handleDeleteCard(evt) {
  evt.preventDefault();
  deleteCard(chosenCard.id)
    .then(() => {
      chosenCard.item.remove();
      closeModal(popupCardDelete);
    })
    .catch((err) => console.log(err));
}

function renderCards(cards) {
  cards.forEach((item) => {
    const cardElement = createCard(
      item,
      handleDeleteCardQuestion,
      handleImgPopup,
      autor.id
    );
    placesList.append(cardElement);
  });
}

Array.from(popups).forEach((popup) => popup.classList.add("popup_is-animated"));

enableValidation(validationConfig);

Promise.all([getAutorInformation(), getCards()])
  .then(([autorData, cardsData]) => {
    profileName.textContent = autor.name = autorData.name;
    profileDescription.textContent = autor.description = autorData.about;
    autor.id = autorData._id;
    profileAvatar.style.backgroundImage =
      autor.avatar = `url(${autorData.avatar})`;
    renderCards(cardsData);
  })
  .catch((err) => console.log(err));
