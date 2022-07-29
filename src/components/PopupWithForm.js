import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);

    this._handleFormSubmit = handleFormSubmit;
    console.log(this.handleFormSubmit);
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll(".popup__input");
    this._submitButton = this._form.querySelector(".popup__button");
    this._submitButtonText = this._submitButton.value;
  }

  // _getInputValues() {
  //   const newinputs = this._form.querySelectorAll("input");

  //   const inputData = {};
  //   newinputs.forEach((input) => {
  //     inputData[input.name] = input.value;
  //   });

  //   return inputData;
  // }

  // Este es el antiguo que funciona NO BORRAR

  _getInputValues() {
    this._data = {};
    console.log(this._data);
    this._inputList.forEach((input) => {
      this._data[input.name] = input.value;
    });
    return this._data;
  }

  /// Hasta aquí ---

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
}

export default PopupWithForm;
