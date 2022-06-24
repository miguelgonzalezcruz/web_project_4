import { openPopupWindow } from "./utils.js";

const previewImagePopup = document.querySelector(".preview-popup");
const previewImageElement = document.querySelector(".popup__preview-image");
const previewImageCaption = document.querySelector(".popup__preview-caption");

class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;

    this._cardSelector = cardSelector;
  }

  // Event Listeners

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => this._handleLike());
    this._deleteButton.addEventListener("click", () => this._handleDelete());
    this._previewImage.addEventListener("click", () =>
      this._handleImagePreview()
    );
  }

  // ---------------- Card activity -----------------------------
  _handleDelete() {
    this._element.remove();
  }

  _handleLike() {
    this._likeButton.classList.toggle("active__heart");
  }

  _handleImagePreview() {
    previewImageElement.src = this._link;
    previewImageElement.alt = this._name;
    previewImageCaption.textContent = this._name;
    openPopupWindow(previewImagePopup);
  }

  // -------------- Card -----------------------------------

  _cardTemplate() {
    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardTemplate;
  }

  getCardElement() {
    this._element = this._cardTemplate();
    this._element.querySelector(".element__image").src = this._link;
    this._element.querySelector(".element__image").alt = this._name;
    this._element.querySelector(".element__content-title").textContent =
      this._name;
    this._likeButton = this._element.querySelector(".element__content-icon");
    this._deleteButton = this._element.querySelector(".element__delete-icon");
    this._previewImage = this._element.querySelector(".element__image");

    this._setEventListeners();
    return this._element;
  }
}

export default Card;
