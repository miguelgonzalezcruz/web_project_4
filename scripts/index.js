import Card from "./Card.js";

import FormValidator from "./FormValidator.js";

import { openPopupWindow, closePopupWindow } from "./utils.js";

const validationConfig = {
  formSelector: "popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const initialCards = [
  {
    name: "Arches National Park",
    link: "https://images.unsplash.com/photo-1605999212792-bc961b37bb55?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
  },
  {
    name: "Lake Louise",
    link: "https://images.unsplash.com/photo-1625229250317-071640d8f9ac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80",
  },
  {
    name: "Olympic National Park",
    link: "https://images.unsplash.com/photo-1639660451092-58a33eb251e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
  },
  {
    name: "Glacier National Park",
    link: "https://images.unsplash.com/photo-1517909568143-3eea286ca180?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
  },
  {
    name: "Yellowstone",
    link: "https://images.unsplash.com/photo-1579824893947-6ec92314d5de?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
  },
  {
    name: "Bryce Canyon",
    link: "https://images.unsplash.com/photo-1651613628753-6c9690b72de2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1433&q=80",
  },
];

//--------------------------------------------------------------------------------

const placesWrap = document.querySelector(".elements");

const editPopupElement = document.querySelector(".edit-popup");
const formEditProfile = document.querySelector(".popup__content-form");

const createPopupElement = document.querySelector(".create-popup");
const formCreateElement = document.querySelector(".popup__create-form");

//--------------------------------------------------------------------------------

const profileInfoTitle = document.querySelector(".profile__info-title");
const profileInfoSubtitle = document.querySelector(".profile__info-subtitle");

//--------------------------------------------------------------------------------

const profileEditButton = document.querySelector(".profile__info-edit");
const profileAddButton = document.querySelector(".profile__add");

const inputValueTitle = formEditProfile.querySelector(
  ".popup__input_content_name"
);
const inputValueSubtitle = formEditProfile.querySelector(
  ".popup__input_content_role"
);

const previewImagePopup = document.querySelector(".preview-popup");

const nameValue = formCreateElement.querySelector(".popup__input_content_name");
const linkValue = formCreateElement.querySelector(".popup__input_content_link");

// --------------------------------------------------------------------------------

function editProfileContent(evt) {
  evt.preventDefault();

  profileInfoTitle.textContent = inputValueTitle.value;
  profileInfoSubtitle.textContent = inputValueSubtitle.value;

  closePopupWindow(editPopupElement);
}

function createContent(evt) {
  evt.preventDefault();
  renderCard(
    {
      name: nameValue.value,
      link: linkValue.value,
    },
    placesWrap
  );

  closePopupWindow(createPopupElement);
}

//--------------------------------------------------------------------------------

formEditProfile.addEventListener("submit", editProfileContent);
formCreateElement.addEventListener("submit", createContent);

//--------------------------- Closing popup on the overlay ------------------------

editPopupElement.addEventListener("mousedown", (evt) => {
  if (
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup__content-close")
  ) {
    closePopupWindow(editPopupElement);
  }
});

createPopupElement.addEventListener("mousedown", (evt) => {
  if (
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup__content-close")
  ) {
    closePopupWindow(createPopupElement);
  }
});

previewImagePopup.addEventListener("mousedown", (evt) => {
  if (
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup__content-close")
  ) {
    closePopupWindow(previewImagePopup);
  }
});

//--------------------------- Refactoring ------------------------

const editFormElement = editPopupElement.querySelector(".popup__form");
const addFormElement = createPopupElement.querySelector(".popup__form");

const addFormValidator = new FormValidator(validationConfig, addFormElement);
addFormValidator.enableValidation();

const editFormValidator = new FormValidator(validationConfig, editFormElement);
editFormValidator.enableValidation();

profileEditButton.addEventListener("click", () => {
  inputValueTitle.value = profileInfoTitle.textContent;
  inputValueSubtitle.value = profileInfoSubtitle.textContent;
  editFormValidator.resetValidation();
  openPopupWindow(editPopupElement);
});

profileAddButton.addEventListener("click", () => {
  formCreateElement.reset();
  addFormValidator.resetValidation();

  openPopupWindow(createPopupElement);
});

//--------------------------- Render ------------------------

const renderCard = (data, wrapper) => {
  const card = new Card(data, "#card-template").getCardElement();
  wrapper.prepend(card);
};

initialCards.forEach((data) => {
  renderCard(data, placesWrap);
});
