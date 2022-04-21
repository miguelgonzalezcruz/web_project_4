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

// End Edit Profile Form

// Heart icon only works with the first card. No need to fix it for now

// const heartInactive = document.querySelector(".element__content-icon");

// function activeHeart() {
//   heartInactive.classList.toggle("active__heart");
// }

// heartInactive.addEventListener("click", activeHeart);

// End Heart Icon
