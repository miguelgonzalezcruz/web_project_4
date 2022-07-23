class Card {
  constructor(data, cardSelector, handleImagePreview) {
    this._handleImagePreview = handleImagePreview;
    this._name = data.name;
    this._link = data.link;
    this._cardTemplate = document
      .querySelector(cardSelector)
      .content.querySelector(".element");
    this._element;
    this._previewImage;
  }

  createCardElement() {
    this._element = this._getCardElement();

    this._TextAndImage();
    this._setEventListeners();

    return this._element;
  }

  _getCardElement() {
    return this._cardTemplate.cloneNode(true);
  }

  _setEventListeners() {
    const likeButton = this._element.querySelector(".element__content-icon");
    const deleteButton = this._element.querySelector(".element__delete-icon");

    likeButton.addEventListener("click", () => this._handleLike());
    deleteButton.addEventListener("click", () => this._handleDelete());

    const previewImage = this._element.querySelector(".element__image");

    previewImage.addEventListener("click", () => {
      this._handleImagePreview();
    });
  }

  _handleLike() {
    this._likeButton.classList.toggle("active__heart");
  }

  _handleDelete() {
    this._element.remove();
    this._element = null;
  }

  _TextAndImage() {
    this._likeButton = this._element.querySelector(".element__content-icon");
    this._previewImage = this._element.querySelector(".element__image");
    this._previewImage.src = this._link;
    this._previewImage.alt = this._name;
    this._element.querySelector(".element__content-title").textContent =
      this._name;
  }
}

export default Card;
