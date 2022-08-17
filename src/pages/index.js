import "./index.css";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import {
  constants,
  nameInput,
  titleInput,
  avatarInput,
} from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../utils/Api";

let userId = null;

// --------------- Edit Profile Const --------------------------------------------
const profileEditButton = document.querySelector(".profile__info-edit");
const editPopupElement = document.querySelector(".edit-popup");
const formEditProfile = document.querySelector(".popup__content-form");
const formAvatarEdit = document.querySelector(".popup__avatar-form");
const avatarEditButton = document.querySelector(".profile__avatar-edit");
const avatarPopupElement = document.querySelector(".avatar-popup");
const deletePopupElement = document.querySelector(".delete-popup");

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

const confirmDeletePopup = new PopupWithConfirmation("#delete-popup");
confirmDeletePopup.setEventListeners();

const user = new UserInfo({
  userNameInput: nameInput,
  userJobInput: titleInput,
  userAvatarInput: avatarInput,
});

const api = new Api({
  url: " https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "f0f5b035-9e61-4cc2-926f-83804fb546a7",
    "Content-Type": "application/json",
  },
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([data, cards]) => {
    userId = data._id;
    console.log(data);
    user.addUserInfo({
      userNewNameInput: data.name,
      userNewJobInput: data.about,
      userNewAvatarInput: data.avatar,
    });
    placesGrid.setupItems(cards);
    placesGrid.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

const placesGrid = new Section(
  {
    items: [],
    renderer: (data) => {
      renderCard(placesGrid, data, imagePopup, confirmDeletePopup);
    },
  },
  ".elements"
);

// ------- Render Card ---------

function renderCard(cardSection, data, imagePopup, confirmDeletePopup) {
  data._userId = userId;
  const cardObject = new Card(
    data,
    "#card-template",
    () => {
      imagePopup.openPopupWindow(data);
    },
    () => {
      if (cardObject.isLiked()) {
        api.removeNewLikes(data._id).then((response) => {
          console.log(response);
          cardObject.setLikes(response.likes);
        });
      } else {
        api.addNewLikes(data._id).then((response) => {
          console.log(response);
          cardObject.setLikes(response.likes);
        });
      }
    },
    () => {
      confirmDeletePopup.confirmDelete(() => {
        confirmDeletePopup.loadingText(true);
        api
          .deleteCard(data._id)
          .then(() => {
            cardObject.handleDelete();
          })
          .finally(() => confirmDeletePopup.loadingText(false));
        confirmDeletePopup.closePopupWindow();
      });
      confirmDeletePopup.openPopupWindow();
    }
  );

  const newItem = cardObject.createCardElement();
  cardSection.addItem(newItem);
}

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

const editFormValidator = new FormValidator(constants, editPopupElement);
const addFormValidator = new FormValidator(constants, createPopupElement);
const avatarFormValidator = new FormValidator(constants, avatarPopupElement);
const deleteFormValidator = new FormValidator(constants, deletePopupElement);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
avatarFormValidator.enableValidation();
deleteFormValidator.enableValidation();

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
