const cardTemplate = document.querySelector("#card-template").content;

export const createCard = (item, deleteCard, likeCard, handleImgPopup) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardTitle.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardImage.addEventListener("click", (evt) => handleImgPopup(evt));
  deleteButton.addEventListener("click", (evt) => {
    deleteCard(evt);
  });
  likeButton.addEventListener("click", (evt) => {
    likeCard(evt);
  });

  return cardElement;
};

export const deleteCard = (evt) => {
  const item = evt.target.closest(".card");
  item.remove();
};

export function handleButtonLike(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}
