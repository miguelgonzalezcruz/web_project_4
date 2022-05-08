const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".element");

// Wrappers
const placesWrap = document.querySelector(".elements");
const editPopupElement = document.querySelector(".edit-popup");
const createPopupElement = document.querySelector(".create-popup");
const formSubmit = document.querySelector(".popup__content-form");
const formCreate = document.querySelector(".popup__create-form");

// Buttons and other DOM elements
const profileEditButton = document.querySelector(".profile__info-edit");
const profileAddButton = document.querySelector(".profile__add");
const editPopupCloseButton = document.querySelector(".edit__close-button");
const createPopupCloseButton = document.querySelector(".create__close-button");
const profileInfoTitle = document.querySelector(".profile__info-title");
const profileInfoSubtitle = document.querySelector(".profile__info-subtitle");

// Form data
const inputValueTitle = formSubmit.querySelector(".popup__input_content_name");
const inputValueSubtitle = formSubmit.querySelector(
  ".popup__input_content_role"
);

const nameValue = formCreate.querySelector(".popup__input_content_name");
const linkValue = formCreate.querySelector(".popup__input_content_link");

// Functions

function togglePopupElement(modalWindow) {
  if (!modalWindow.classList.contains("popup_is")) {
    inputValueTitle.value = profileInfoTitle.textContent;
    inputValueSubtitle.value = profileInfoSubtitle.textContent;
  }
  modalWindow.classList.toggle("popup_is-opened");
}

function editProfileContent(evt) {
  evt.preventDefault();

  profileInfoTitle.textContent = inputValueTitle.value;
  profileInfoSubtitle.textContent = inputValueSubtitle.value;

  togglePopupElement(editPopupElement);
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

  togglePopupElement(createPopupElement);
}

// Event listerners

formSubmit.addEventListener("submit", editProfileContent);
formCreate.addEventListener("submit", createContent);

profileEditButton.addEventListener("click", () => {
  togglePopupElement(editPopupElement);
});

profileAddButton.addEventListener("click", () => {
  togglePopupElement(createPopupElement);
});

editPopupCloseButton.addEventListener("click", () => {
  togglePopupElement(editPopupElement);
});

createPopupCloseButton.addEventListener("click", () => {
  togglePopupElement(createPopupElement);
});

const getCardElement = (data) => {
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector(".element__delete-icon");

  cardElement.querySelector(".element__image").src = data.link;
  cardElement.querySelector(".element__content-title").textContent = data.name;
  cardElement
    .querySelector(".element__content-icon")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("active__heart");
    });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  return cardElement;
};

const renderCard = (data, wrapper) => {
  const newCard = getCardElement(data);
  wrapper.prepend(newCard);
};

initialCards.forEach((data) => {
  renderCard(data, placesWrap);
});
