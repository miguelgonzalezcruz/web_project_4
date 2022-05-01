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

const elementsList = document.querySelector(".elements");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".element");

//Profile content

const profileInfoTitle = document.querySelector(".profile__info-title");
const profileInfoSubtitle = document.querySelector(".profile__info-subtitle");

//Open popup
const popupElement = document.querySelector(".popup");
const profileEditButton = document.querySelector(".profile__info-edit");
const inputValueTitle = document.querySelector(".popup__input_content_name");
const inputValueSubtitle = document.querySelector(".popup__input_content_role");

function openPopup() {
  inputValueTitle.value = profileInfoTitle.textContent;
  inputValueSubtitle.value = profileInfoSubtitle.textContent;

  popupElement.classList.add("popup_is-opened");
}

profileEditButton.addEventListener("click", openPopup);

//End Open popup

//Close popup

const popupCloseButton = document.querySelector(".popup__content-close");

function closePopup() {
  popupElement.classList.remove("popup_is-opened");
}

popupCloseButton.addEventListener("click", closePopup);

//End Close popup

//Edit Profile form

const formSubmit = document.querySelector(".popup__content-form");

function editProfileContent(evt) {
  evt.preventDefault();

  profileInfoTitle.textContent = inputValueTitle.value;
  profileInfoSubtitle.textContent = inputValueSubtitle.value;

  closePopup();
}

formSubmit.addEventListener("submit", editProfileContent);

initialCards.forEach(function (card) {
  //clone the template
  const cardElement = cardTemplate.cloneNode(true);
  // query title element
  cardElement.querySelector(".element__content-title").textContent = card.name;
  // query image element
  cardElement.querySelector(
    ".element__image"
  ).imageContent = `url(${card.link})`;
  // add event listeners
  // append it to the list
  elementsList.append(cardElement);
});

// End Edit Profile Form

// Heart icon only works with the first card. No need to fix it for now

// const heartInactive = document.querySelector(".element__content-icon");

// function activeHeart() {
//   heartInactive.classList.toggle("active__heart");
// }

// heartInactive.addEventListener("click", activeHeart);

// End Heart Icon
