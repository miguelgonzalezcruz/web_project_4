import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  _addImagePreview() {
    const previewImageElement = document.querySelector(".popup__preview-image");
    const previewImageCaption = document.querySelector(
      ".popup__preview-caption"
    );

    previewImageElement.src = this.link;
    previewImageElement.alt = this.name;
    previewImageCaption.textContent = this.name;
  }

  openPopupWindow(data) {
    this.name = data.name;
    this.link = data.link;
    this._addImagePreview();
    super.openPopupWindow();
  }
}

export default PopupWithImage;
