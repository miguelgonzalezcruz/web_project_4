import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll(".popup__input");
    this._submitButton = this._form.querySelector(".popup__button");
    this._normalButtonText = this._submitButton.textContent;
    this._submitButtonText = this._submitButton.value;
  }

  _getInputValues() {
    this._data = {};
    this._inputList.forEach((input) => {
      this._data[input.name] = input.value;
    });
    return this._data;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  closePopupWindow() {
    super.closePopupWindow();
    this._form.reset();
  }

  openPopupWindow() {
    super.openPopupWindow();
    this._submitButton.value = this._submitButtonText;
  }

  loadingText(isLoading) {
    if (isLoading === true) {
      this._submitButton.textContent = "Loading ...";
    } else {
      this._submitButton.textContent = this._normalButtonText;
    }
  }
}

export default PopupWithForm;
