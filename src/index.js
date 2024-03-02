import "./pages/index.css";
import {
  getAutorInformation,
  getCards,
  updateProfile,
  addNewCard,
  deleteCard,
  likeCard,
  dislikeCard,
  editAvatar,
} from "./components/api";
import { openModal, closeModal } from "./components/modal";
import { createCard } from "./components/cards";
import {
  enableValidation,
  validationConfig,
  clearValidation,
} from "./components/validation";

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

let autor = {
  name: profileName.textContent,
  description: profileDescription.textContent,
};

let chosenCard = { };

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
  updateProfile(profileInputName.value, profileInputDesc.value).then((data) => {
    profileName.textContent = data.name;
    profileDescription.textContent = data.about;
  }).catch(err => console.log(err))
  .finally(bootProcess(profileEditForm, false));
  closeModal(popupEdit);
}

function handleNewAvatar(evt) {
  evt.preventDefault();
  bootProcess(avatarForm, true);
  editAvatar(avatarInputLink.value)
    .then((data) => {
      profileAvatar.style.backgroundImage = `url(${data.avatar})`;
    })
    .catch((err) => console.log(err))
    .finally(bootProcess(avatarForm, false));
  evt.target.reset();
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
          handleLikeCard,
          handleImgPopup,
          autor.id
        )
      );
    })
    .catch((err) => console.log(err))
    .finally(bootProcess(cardForm, false));
  evt.target.reset();
  closeModal(popupCard);
}

function handleImgPopup(evt) {
  imageLink.src = evt.target.src;
  imageDesc.textContent = evt.target.alt;
  imageLink.alt = imageDesc.textContent;
  openModal(imagePopup);
}

function handleLikeCard(evt, cardId, likeCount) {
  evt.preventDefault();
  if (evt.target.classList.contains("card__like-button_is-active")) {
    dislikeCard(cardId).then((res) => {
      evt.target.classList.remove("card__like-button_is-active");
      likeCount.textContent = res.likes.length;
    });
  } else {
    likeCard(cardId).then((res) => {
      evt.target.classList.add("card__like-button_is-active");
      likeCount.textContent = res.likes.length;
    });
  }
}

function handleDeleteCardQuestion(evt, cardId, cardElement) {
  evt.preventDefault();
  openModal(popupCardDelete);
  chosenCard = {
    id: cardId,
    item : cardElement
  };
}

function handleDeleteCard(evt) {
  evt.preventDefault();
  deleteCard(chosenCard.id);
  chosenCard.item.remove();
  closeModal(popupCardDelete);
}

function renderCards(cards) {
  cards.forEach((item) => {
    const cardElement = createCard(
      item,
      handleDeleteCardQuestion,
      handleLikeCard,
      handleImgPopup,
      autor.id
    );
    placesList.append(cardElement);
  });
}

function bootProcess(form, isBooting) {
  const btn = form.querySelector(".popup__button");
  btn.textContent = isBooting
    ? (btn.textContent = "Сохранение...")
    : (btn.textContent = "Сохранить");
}

Array.from(popups).forEach((popup) => popup.classList.add("popup_is-animated"));

enableValidation(validationConfig);

Promise.all([getAutorInformation(), getCards()]).then(
  ([autorData, cardsData]) => {
    profileName.textContent = autor.name = autorData.name;
    profileDescription.textContent = autor.description = autorData.about;
    autor.id = autorData._id;
    profileAvatar.style.backgroundImage =
      autor.avatar = `url(${autorData.avatar})`;
    renderCards(cardsData);
  }
);
