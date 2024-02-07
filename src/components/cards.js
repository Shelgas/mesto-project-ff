const cardTemplate = document.querySelector("#card-template").content;

export const createCard = (item, deleteCard) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardTitle.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;
  deleteButton.addEventListener("click", (evt) => {
    deleteCard(evt);
  });

  return cardElement;
};

export const deleteCard = (evt) => {
  const item = evt.target.closest(".card");
  item.remove();
};
