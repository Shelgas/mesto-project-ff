const cardTemplate = document.querySelector("#card-template").content;

export const createCard = (
  item,
  handleDeleteCard,
  handleLikeCard,
  handleImgPopup,
  autorID
) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
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
    handleDeleteCard(evt, cardId)
  );
  likeButton.addEventListener("click", (evt) =>
    handleLikeCard(evt, cardId, cardLikeCount)
  );
  return cardElement;
};

function likeCheck(card, id) {
  return card.likes.some((item) => item._id === id);
}
