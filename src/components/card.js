import { likeCard, dislikeCard } from "./api";

const cardTemplate = document.querySelector("#card-template").content;

export const createCard = (
  item,
  handleDeleteCardQuestion,
  handleImgPopup,
  autorID
) => {
  const cardElement = getCardTemplate();
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardId = item["_id"];
  const cardLikeCount = cardElement.querySelector(".card__like-counter");

  cardTitle.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardLikeCount.textContent = item.likes.length;

  if (likeCheck(item, autorID)) {
    likeButton.classList.add("card__like-button_is-active");
  } else {
    likeButton.classList.remove("card__like-button_is-active");
  }
  if (item.owner._id !== autorID) {
    deleteButton.style.display = "none";
  }

  cardImage.addEventListener("click", (evt) => handleImgPopup(evt));
  deleteButton.addEventListener("click", (evt) =>
    handleDeleteCardQuestion(evt, cardId, cardElement)
  );
  likeButton.addEventListener("click", (evt) =>
    handleLikeCard(evt, cardId, cardLikeCount)
  );
  return cardElement;
};
 

function likeCheck(card, id) {
  return card.likes.some((item) => item._id === id);
}

function getCardTemplate() {
  return cardTemplate.querySelector(".card").cloneNode(true);
}

function handleLikeCard(evt, cardId, likeCount) {
  evt.preventDefault();
  if (evt.target.classList.contains("card__like-button_is-active")) {
    dislikeCard(cardId)
      .then((res) => {
        evt.target.classList.remove("card__like-button_is-active");
        likeCount.textContent = res.likes.length;
      })
      .catch((err) => console.log(err));
  } else {
    likeCard(cardId)
      .then((res) => {
        evt.target.classList.add("card__like-button_is-active");
        likeCount.textContent = res.likes.length;
      })
      .catch((err) => console.log(err));
  }
}