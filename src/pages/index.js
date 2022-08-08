import "./index.css";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import {
  initialCards,
  constants,
  nameInput,
  titleInput,
  avatarInput,
} from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../utils/Api";

// --------------- Edit Profile Const --------------------------------------------
const profileEditButton = document.querySelector(".profile__info-edit");
const editPopupElement = document.querySelector(".edit-popup");
const formEditProfile = document.querySelector(".popup__content-form");

// --------------- New Card Const ----------------------------------------------
const profileAddButton = document.querySelector(".profile__add");
const createPopupElement = document.querySelector(".create-popup");

// --------------- Forms -------------------------------------------------------
const inputValueTitle = formEditProfile.querySelector(
  ".popup__input_content_name"
);
const inputValueSubtitle = formEditProfile.querySelector(
  ".popup__input_content_role"
);

const imagePopup = new PopupWithImage("#preview-popup");
imagePopup.setEventListeners();

// La información del perfil de usuario
const user = new UserInfo({
  userNameInput: nameInput,
  userJobInput: titleInput,
  userAvatarInput: avatarInput,
});

// Declaramos la API

const api = new Api({
  //La url de la API con la info del grupo
  url: " https://around.nomoreparties.co/v1/group-12",
  //El header con el token de acceso
  headers: {
    authorization: "f0f5b035-9e61-4cc2-926f-83804fb546a7",
    "Content-Type": "application/json",
  },
});

// Llamamos a la API para recoger la info del perfil de usuario

api.getUserInfo().then((data) => {
  user.addUserInfo({
    userNewNameInput: data.name,
    userNewJobInput: data.title,
    userNewAvatarInput: data.avatar,
  });
});

function renderCard(cardSection, data) {
  const cardObject = new Card(data, "#card-template", () => {
    imagePopup.openPopupWindow(data);
  });

  const newItem = cardObject.createCardElement();
  cardSection.addItem(newItem);
}

const placesGrid = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      renderCard(placesGrid, data, imagePopup);
    },
  },
  ".elements"
);

placesGrid.renderItems();

const editProfile = new PopupWithForm({
  popupSelector: ".edit-popup",

  handleFormSubmit: (data) => {
    user.addUserInfo({
      userNewNameInput: data.name,
      userNewJobInput: data.title,
    });
    editProfile.closePopupWindow();
  },
});

editProfile.setEventListeners();

const addNewCard = new PopupWithForm({
  popupSelector: "#create-popup",

  handleFormSubmit: (data) => {
    renderCard(placesGrid, data);
    addNewCard.closePopupWindow();
  },
});

addNewCard.setEventListeners();

const editFormValidator = new FormValidator(constants, editPopupElement);
const addFormValidator = new FormValidator(constants, createPopupElement);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

profileAddButton.addEventListener("click", () => {
  addNewCard.openPopupWindow();
  addFormValidator.resetValidation();
});

profileEditButton.addEventListener("click", () => {
  const userInput = user.getUserInfo();

  inputValueTitle.value = userInput.userNameInput;
  inputValueSubtitle.value = userInput.userJobInput;
  editProfile.openPopupWindow();

  editFormValidator.resetValidation();
});
