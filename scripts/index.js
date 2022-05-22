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

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".element");

// Wrappers
const placesWrap = document.querySelector(".elements");

const formEditProfile = document.querySelector(".popup__content-form");
const formCreateElement = document.querySelector(".popup__create-form");

// Popup actions
const createPopupElement = document.querySelector(".create-popup");
const editPopupElement = document.querySelector(".edit-popup");
const previewImagePopup = document.querySelector(".preview-popup");

// Buttons and other DOM elements
const profileEditButton = document.querySelector(".profile__info-edit");
const profileAddButton = document.querySelector(".profile__add");
const profileInfoTitle = document.querySelector(".profile__info-title");
const profileInfoSubtitle = document.querySelector(".profile__info-subtitle");
const previewImageElement = document.querySelector(".popup__preview-image");
const previewImageCaption = document.querySelector(".popup__preview-caption");

// Form data
const inputValueTitle = formEditProfile.querySelector(
  ".popup__input_content_name"
);
const inputValueSubtitle = formEditProfile.querySelector(
  ".popup__input_content_role"
);

const nameValue = formCreateElement.querySelector(".popup__input_content_name");
const linkValue = formCreateElement.querySelector(".popup__input_content_link");

// Functions

function togglePopupElement(modalWindow) {
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
  formCreateElement.reset();
}

// Event listerners

formEditProfile.addEventListener("submit", editProfileContent);
formCreateElement.addEventListener("submit", createContent);

profileEditButton.addEventListener("click", () => {
  inputValueTitle.value = profileInfoTitle.textContent;
  inputValueSubtitle.value = profileInfoSubtitle.textContent;
  togglePopupElement(editPopupElement);
});

profileAddButton.addEventListener("click", () => {
  togglePopupElement(createPopupElement);
});

const closeButtons = document.querySelectorAll(".popup__content-close");

closeButtons.forEach((button) => {
  // find the closest popup
  const popup = button.closest(".popup");
  // set the listener
  button.addEventListener("click", () => togglePopupElement(popup));
});

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const getCardElement = (data) => {
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector(".element__delete-icon");

  const imagePreview = cardElement.querySelector(".element__image");

  imagePreview.src = data.link;
  imagePreview.alt = data.name;
  cardElement.querySelector(".element__content-title").textContent = data.name;
  cardElement
    .querySelector(".element__content-icon")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("active__heart");
    });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  imagePreview.addEventListener("click", function () {
    previewImageElement.src = data.link;
    previewImageElement.alt = data.name;
    previewImageCaption.textContent = data.name;
    togglePopupElement(previewImagePopup);
  });

  return cardElement;
};

// Closing popup on the overlay

editPopupElement.addEventListener("mousedown", (evt) => {
  if (
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup__content-close")
  ) {
    togglePopupElement(editPopupElement);
  }
});

createPopupElement.addEventListener("mousedown", (evt) => {
  if (
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup__content-close")
  ) {
    togglePopupElement(createPopupElement);
  }
});

previewImagePopup.addEventListener("mousedown", (evt) => {
  if (
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup__content-close")
  ) {
    togglePopupElement(previewImagePopup);
  }
});

// Close popup with ESC

function closePopupElement(modalWindowOpen) {
  modalWindowOpen.classList.remove("popup_is-opened");
}

document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    closePopupElement(editPopupElement);
  }
});

document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    closePopupElement(createPopupElement);
  }
});

document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    closePopupElement(previewImagePopup);
  }
});

// Render

const renderCard = (data, wrapper) => {
  const newCard = getCardElement(data);
  wrapper.prepend(newCard);
};

initialCards.forEach((data) => {
  renderCard(data, placesWrap);
});
