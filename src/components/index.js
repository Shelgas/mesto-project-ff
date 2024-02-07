import '../pages/index.css';
import { initialCards} from'./cards.js';

const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
const createCard = (item, deleteCard) => {
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

// @todo: Функция удаления карточки
const deleteCard = (evt) => {
  const item = evt.target.closest(".card");
  item.remove();
};

// @todo: Вывести карточки на страницу
const renderCards = (cards) => {
  cards.forEach((item) => {
    const cardElement = createCard(item, deleteCard);
    placesList.append(cardElement);
  });
};

renderCards(initialCards);
