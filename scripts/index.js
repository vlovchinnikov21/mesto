import { Card} from './Card.js';
import {FormValidation} from './FormValidation.js';

const profileInfo = document.querySelector('.profile-info');
const popupEditButton = profileInfo.querySelector('.profile-info__edit-button');
const userName = profileInfo.querySelector('.profile-info__name');
const userDescription = profileInfo.querySelector('.profile-info__description');

const popupProfile = document.querySelector('.popup_profile-edit');
const formElementPopup = popupProfile.querySelector('.popup__form');
const nameInput = popupProfile.querySelector('.popup__input_type_name');
const jobInput = popupProfile.querySelector('.popup__input_type_description');
const profileCloseButton = popupProfile.querySelector('.popup__close-button');

const cardsContainer = document.querySelector('.cards');
const cardAddButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_add-card');
const formElementAddCard = popupAddCard.querySelector('.popup__form');
const titleInput = popupAddCard.querySelector('.popup__input_type_title');
const imageLinkInput = popupAddCard.querySelector('.popup__input_type_link');
const cardCloseButton = popupAddCard.querySelector('.popup__close-button');

export const popupPicture = document.querySelector('.popup_picture');
export const popupCaption = popupPicture.querySelector('.popup__caption');
export const popupImage = popupPicture.querySelector('.popup__image');
export const pictureCloseButton = popupPicture.querySelector('.popup__close-button');

const validatorSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_active',
};

const initialCards = [
  {
    name: 'Рязань',
    link: 'https://images.unsplash.com/photo-1613411278232-e29e3506f4fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1011&q=80',
  },
  {
    name: 'Карелия',
    link: 'https://images.unsplash.com/photo-1559029881-7cfd01ac1f18?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Владивосток',
    link: 'https://images.unsplash.com/photo-1563941433-b6a094653ed2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=733&q=80',
  },
  {
    name: 'Санкт-Петербург',
    link: 'https://images.unsplash.com/photo-1554844344-c34ea04258c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80',
  },
  {
    name: 'Москва',
    link: 'https://images.unsplash.com/photo-1547448415-e9f5b28e570d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
];

const cardValidator = addFormValidation(formElementAddCard);
const profileValidator = addFormValidation(formElementPopup);

function createCard(name, link) {
  return new Card(name, link, '#card-template', openPopup, closePopup).generateCard();
}

function addFormValidation(form) {
  return new FormValidation(validatorSelectors, form);
}

const setInfo = () => {
  jobInput.value = userDescription.textContent;
  nameInput.value = userName.textContent;
};

const openPopup = (popupWindow) => {
  popupWindow.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscClose);
};

const closePopup = (popupWindow) => {
  popupWindow.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscClose);
};

const handleOverlayClose = (evt) => {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
};

const handleEscClose = (evt) => {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
};

const handleProfileEdit = (evt) => {
  evt.preventDefault();
  userDescription.textContent = jobInput.value;
  userName.textContent = nameInput.value;
  closePopup(popupProfile);
};

profileCloseButton.addEventListener('mousedown', () =>
  closePopup(popupProfile)
);
cardCloseButton.addEventListener('mousedown', () => closePopup(popupAddCard));

popupProfile.addEventListener('mousedown', handleOverlayClose);
popupAddCard.addEventListener('mousedown', handleOverlayClose);
popupPicture.addEventListener('mousedown', handleOverlayClose);

formElementPopup.addEventListener('submit', handleProfileEdit);

popupEditButton.addEventListener('click', () => {
  setInfo();
  profileValidator.enableValidation();
  profileValidator.enablePopupSubmitButton();
  openPopup(popupProfile);
});

const renderCards = () => {
  const cardInfo = initialCards.map((item) => {
    const newCard = createCard(item.name, item.link);

    return newCard;
  });

  cardsContainer.append(...cardInfo);
};

cardAddButton.addEventListener('click', () => {
  cardValidator.enableValidation();
  cardValidator.disabledPopupSubmitButton();
  openPopup(popupAddCard);
});

formElementAddCard.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const newCard = createCard(titleInput.value, imageLinkInput.value);

  formElementAddCard.reset();

  cardsContainer.prepend(newCard);

  closePopup(popupAddCard);
});

renderCards();
