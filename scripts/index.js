
//Profile content

const profileInfoTitle = document.querySelector(".profile__info-title");
const profileInfoSubtitle = document.querySelector(".profile__info-subtitle");


//Open popup
const popupElement = document.querySelector(".popup");
const profileEditButton = document.querySelector(".profile__info-edit");
const inputValueTitle = document.querySelector(".input__title");
const inputValueSubtitle = document.querySelector(".input__subtitle");

function openPopup () {
    inputValueTitle.value = profileInfoTitle.textContent;
    inputValueSubtitle.value = profileInfoSubtitle.textContent;

    popupElement.classList.add("popup__show");
}

profileEditButton.addEventListener("click", openPopup);

//End Open popup

//Close popup

const popupCloseButton = document.querySelector(".popup__content-close");

function closePopup () {
    popupElement.classList.remove("popup__show");
}

popupCloseButton.addEventListener("click", closePopup)

//End Close popup

const formSubmit = document.querySelector(".popup__content-form");

function editProfileContent(evt) {
    evt.prventDefault();

    profileInfoTitle.textContent = inputValueTitle.value;
    profileInfoSubtitle.textContent = inputValueSubtitle.value;

    closePopup();
}

formSubmit.addEventListener("submit", editProfileContent);


