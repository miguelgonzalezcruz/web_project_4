class Card {
  constructor(data, cardSelector, handleImagePreview) {
    // ---
    this._createdAt = data.createdAt;
    this._likes = data.likes;
    this._link = data.link;
    this._name = data.name;
    this._id = data._id;
    // --
    this._cardTemplate = document
      .querySelector(cardSelector)
      .content.querySelector("#element");
    // --
    this._handleImagePreview = handleImagePreview;
    // --
    this._element;
    this._previewImage;
    this._totalLikes;
  }

  _showlikes() {
    this._totalLikes.textContent = this._likes.length;
  }

  _getCardElement() {
    return this._cardTemplate.cloneNode(true);
  }

  createCardElement() {
    this._element = this._getCardElement();
    this._setTextAndImage();
    this._setEventListeners();
    this._showlikes();
    return this._element;
  }

  _setTextAndImage() {
    this._deleteButton = this._element.querySelector(".element__delete-icon");
    this._likeButton = this._element.querySelector(".element__content-icon");
    this._previewImage = this._element.querySelector(".element__image");
    this._previewImage.src = this._link;
    this._previewImage.alt = this._name;
    this._element.querySelector(".element__content-title").textContent =
      this._name;
    this._totalLikes = this._element.querySelector(".element__content-number");
  }

  _getCardElement() {
    return this._cardTemplate.cloneNode(true);
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => this._handleLike());
    this._deleteButton.addEventListener("click", () => this._handleDelete());
    this._previewImage.addEventListener("click", () =>
      this._handleImagePreview()
    );
  }

  _handleLike() {
    this._likeButton.classList.toggle("active__heart");
  }

  _handleDelete() {
    this._element.remove();
    this._element = null;
  }
}
export default Card;
