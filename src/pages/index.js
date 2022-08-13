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
const formAvatarEdit = document.querySelector(".popup__avatar-form");
const avatarEditButton = document.querySelector(".profile__avatar-edit");
const avatarPopupElement = document.querySelector(".avatar-popup");

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

const inputAvatar = formAvatarEdit.querySelector(".popup__input_avatar_link");

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
    // en UserInfo.js
    userNewNameInput: data.name,
    userNewJobInput: data.about,
    userNewAvatarInput: data.avatar,
  });
});

// **** START ALL CARD RELATED ********

// Llamamos a la API para recoger la info de las tarjetas iniciales

api.getInitialCards().then((cards) => {
  placesGrid.setupItems(cards); // en section.js
  placesGrid.renderItems();
});

const placesGrid = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      //En section
      renderCard(placesGrid, data, imagePopup);
    },
  },
  ".elements"
);

function renderCard(cardSection, data) {
  const cardObject = new Card(data, "#card-template", () => {
    imagePopup.openPopupWindow(data);
  });

  const newItem = cardObject.createCardElement();
  cardSection.addItem(newItem);
}

placesGrid.renderItems();

//---- Inicio Crear nuevas tarjetas

const addNewCard = new PopupWithForm({
  popupSelector: "#create-popup",
  handleFormSubmit: (data) => {
    addNewCard.loadingText(true);
    api
      .postNewCard(data)
      .then((data) => {
        renderCard(placesGrid, data);
        addNewCard.closePopupWindow();
      })
      .finally(() => addNewCard.loadingText(false));
  },
});

addNewCard.setEventListeners();

// **** FINISH ALL CARD RELATED *****

//---- Start New Code Task 3 Editing Profile ----

const editProfile = new PopupWithForm({
  popupSelector: ".edit-popup",
  handleFormSubmit: (data) => {
    editProfile.loadingText(true);
    api
      .editUserInfo(data)
      .then((data) => {
        user.addUserInfo({
          userNewNameInput: data.name,
          userNewJobInput: data.about,
          userNewAvatarInput: data.avatar,
        });
      })
      .finally(() => editProfile.loadingText(false));
    editProfile.closePopupWindow();
  },
});

editProfile.setEventListeners();

// ----- Start Updating profile picture ------

const editProfilePicture = new PopupWithForm({
  popupSelector: ".avatar-popup",
  handleFormSubmit: (data) => {
    editProfilePicture.loadingText(true);
    api
      .editUserPicture(data)
      .then((data) => {
        user.addUserAvatar({
          userNewAvatarInput: data.avatar,
        });
      })
      .finally(() => editProfilePicture.loadingText(false));
    editProfilePicture.closePopupWindow();
  },
});

editProfilePicture.setEventListeners();

// ---- Finish Updating profile picture -----

const editFormValidator = new FormValidator(constants, editPopupElement);
const addFormValidator = new FormValidator(constants, createPopupElement);
const avatarFormValidator = new FormValidator(constants, avatarPopupElement);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
avatarFormValidator.enableValidation();

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

avatarEditButton.addEventListener("click", () => {
  const userInput = user.getUserInfo();
  inputAvatar.value = userInput.userAvatarInput;
  editProfilePicture.openPopupWindow();
  avatarFormValidator.resetValidation();
});
