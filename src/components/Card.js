class Card {
  constructor(
    data,
    cardSelector,
    handleImagePreview,
    handleLikeButton,
    handleDeleteButton
  ) {
    // ---
    this._createdAt = data.createdAt;
    this._likes = data.likes;
    this._link = data.link;
    this._name = data.name;
    this._id = data._id;
    this._userId = data._userId;
    this._ownerId = data.owner._id;
    // --
    this._cardTemplate = document
      .querySelector(cardSelector)
      .content.querySelector("#element");
    // --
    this._handleImagePreview = handleImagePreview;
    this._handleLikeButton = handleLikeButton;
    this._handleDeleteButton = handleDeleteButton;
    // --
    this._element;
    this._previewImage;
    this._totalLikes;
  }

  _showlikes() {
    this._totalLikes.textContent = this._likes.length;

    if (this.isLiked()) {
      this._likeButton.classList.add("active__heart");
    } else {
      this._likeButton.classList.remove("active__heart");
    }
  }

  _getCardElement() {
    return this._cardTemplate.cloneNode(true);
  }

  createCardElement() {
    this._element = this._getCardElement();
    this._setTextAndImage();
    this._setEventListeners();
    this._showlikes();
    this._hideDelete();
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
    this._likeButton.addEventListener("click", () => this._handleLikeButton());
    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteButton()
    );
    this._previewImage.addEventListener("click", () =>
      this._handleImagePreview()
    );
  }

  handleDelete() {
    this._element.remove();
  }

  setLikes(likes) {
    this._likes = likes;
    this._showlikes();
  }

  isLiked() {
    return Boolean(this._likes.find((user) => user._id === this._userId));
  }

  _hideDelete() {
    if (this._userId !== this._ownerId) {
      this._deleteButton.remove();
    }
  }
}
export default Card;
