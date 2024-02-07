import './pages/index.css';
import { initialCards} from './components/cards';
import { openModal, closeModal } from './components/modal';


const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

const popup = document.querySelector('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupCard = document.querySelector('.popup_type_new-card');

const cardAddBtn = document.querySelector('.profile__add-button'); 
const profileEditBtn = document.querySelector('.profile__edit-button');
const closeBtns = document.querySelectorAll('.popup__close');

const profileName = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')

const profileEditForm = document.forms['edit-profile'];
const profileInputName = profileEditForm.elements.name;
const profileInputDesc = profileEditForm.elements.description;

profileEditBtn.addEventListener('click', (evt) => {
  profileInputName.value = profileName.textContent;
  profileInputDesc.value = profileDescription.textContent;
  openModal(popupEdit);
});
cardAddBtn.addEventListener('click', () => openModal(popupCard));

Array.from(closeBtns).forEach((btn) => btn.addEventListener('click',
 () => closeModal(btn.closest(".popup"))));



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
