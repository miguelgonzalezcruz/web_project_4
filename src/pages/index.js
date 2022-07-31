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

function renderCard(cardSection, data, cardPopup) {
  const cardObject = new Card(data, "#card-template", () => {
    cardPopup.openPopupWindow(data);
  });

  const newItem = cardObject.createCardElement();
  cardSection.addItem(newItem);
}

const imagePopup = new PopupWithImage("#preview-popup");
imagePopup.setEventListeners();

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

const user = new UserInfo({
  userNameInput: nameInput,
  userJobInput: titleInput,
});

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
    const cardObject = new Card(data, "#card-template");
    const newItem = cardObject.createCardElement();

    placesGrid.addItem(newItem);
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
