import "./index.css";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import {
  initialCards,
  constants,
  nameInput,
  titleInput,
} from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

// --------------- Edit Profile Const --------------------------------------------
const profileEditButton = document.querySelector(".profile__info-edit");
const editPopupElement = document.querySelector(".edit-popup");
const formEditProfile = document.querySelector(".popup__content-form");

// --------------- New Card Const ----------------------------------------------
const profileAddButton = document.querySelector(".profile__add");
const createPopupElement = document.querySelector(".create-popup");
const formCreateElement = document.querySelector(".popup__create-form");

// --------------- Forms -------------------------------------------------------
const inputValueTitle = formEditProfile.querySelector(
  ".popup__input_content_name"
);
const inputValueSubtitle = formEditProfile.querySelector(
  ".popup__input_content_role"
);
const nameValue = formCreateElement.querySelector(".popup__input_content_name");
const linkValue = formCreateElement.querySelector(".popup__input_content_link");
// const nameInput = ".profile__info-title";
// const titleInput = ".profile__info-subtitle";

function renderCard(cardSection, data, cardPopup) {
  const cardObject = new Card(data, "#card-template", () => {
    cardPopup.openPopupWindow(data);
  });

  const newItem = cardObject.createCardElement();
  cardSection.addItem(newItem);
}

//  --------  POPUP IMAGEN --------

// --------- inicio CÓDIGO ANTIGUO  POPUP IMAGEN --------

// const imagePopup = new PopupWithImage({
//   popupSelector: "preview-popup",
//   imagePopup.setEventListeners();
// });

// --------- FIN CÓDIGO ANTIGUO  POPUP IMAGEN --------

// --------- INICIO NUEVO CÓDIGO  POPUP IMAGEN --------

const imagePopup = new PopupWithImage("#preview-popup");
imagePopup.setEventListeners();
// --------- FIN NUEVO CÓDIGO  POPUP IMAGEN --------

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

// --------- INICIO CÓDIGO EDIT USER --------

const user = new UserInfo({
  userNameInput: nameInput,
  userJobInput: titleInput,
});

// --------- CODIGO ANTIGUO EDIT PROFILE NO EDITAR --------

// const editProfile = new PopupWithForm(".edit-popup", (values) => {
//   user.addUserInfo({
//     userNewNameInput: values.name,
//     userNewJobInput: values.title,
//   });
//   editProfile.closePopupWindow();
// });

// --------- FIN CODIGO ANTIGUO EDIT PROFILE NO EDITAR --------

// const editProfile = new PopupWithForm({
//   popupSelector: ".edit-popup",

//   handleFormSubmit: (values) => {
//     const userNewInput = user.addUserInfo(values);

//     userNewInput.addUserInfo();

//     editProfile.closePopupWindow();
//   },
// });

// Tests que voy haciendo

const editProfile = new PopupWithForm({
  popupSelector: ".edit-popup",

  handleFormSubmit: (data) => {
    console.log(2233);
    console.log(data);
    console.log(user);
    user.addUserInfo(data);
    editProfile.closePopupWindow();
  },
});

// Hasta aquí tests

editProfile.setEventListeners();

// Inicio nuevo codigo NUEVA CARD ----

const addNewCard = new PopupWithForm({
  popupSelector: "#create-popup",

  handleFormSubmit: (data) => {
    const cardObject = new Card(data, "#card-template");
    const newItem = cardObject.createCardElement();

    placesGrid.addItem(newItem);
    addNewCard.closePopupWindow();
  },
});

// Inicio código antiguo NUEVA CARD --- NO EDITAR

// const addNewCard = new PopupWithForm(".create-popup", () => {
//   const cardContentNew = {
//     name: nameValue.value,
//     link: linkValue.value,
//   };
//   renderCard(placesGrid, cardContentNew, imagePopup);
//   addNewCard.closePopupWindow();
// });

// Fin código antiguo

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
