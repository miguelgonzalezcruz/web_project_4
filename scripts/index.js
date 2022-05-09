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
const editPopupElement = document.querySelector(".edit-popup");
const createPopupElement = document.querySelector(".create-popup");
const formSubmit = document.querySelector(".popup__content-form");
const formCreate = document.querySelector(".popup__create-form");
const previewImagePopup = document.querySelector(".js-preview-popup");

// Buttons and other DOM elements
const profileEditButton = document.querySelector(".profile__info-edit");
const profileAddButton = document.querySelector(".profile__add");
const editPopupCloseButton = document.querySelector(
  ".popup__content-close_edit"
);
const createPopupCloseButton = document.querySelector(".create__close-button");
const previewPopupCloseButton = document.querySelector(
  ".preview__close-button"
);
const profileInfoTitle = document.querySelector(".profile__info-title");
const profileInfoSubtitle = document.querySelector(".profile__info-subtitle");
const previewImageElement = document.querySelector(".popup__preview_image");
const previewImageCaption = document.querySelector(".popup__preview_caption");

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

previewPopupCloseButton.addEventListener("click", () => {
  togglePopupElement(previewImagePopup);
});

const getCardElement = (data) => {
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector(".element__delete-icon");

  const imagePreview = cardElement.querySelector(".element__image");

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

  imagePreview.addEventListener("click", function () {
    previewImageElement.src = data.link;
    previewImageCaption.textContent = data.name;
    togglePopupElement(previewImagePopup);
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
