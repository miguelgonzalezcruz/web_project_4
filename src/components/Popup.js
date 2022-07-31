class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._pressEsc = this._pressEsc.bind(this);
  }

  openPopupWindow() {
    this._popup.classList.add("popup_is-opened");
    document.addEventListener("keydown", this._pressEsc);
  }

  closePopupWindow() {
    this._popup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", this._pressEsc);
  }

  _pressEsc(evt) {
    if (evt.key === "Escape") {
      this.closePopupWindow();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup")) {
        this.closePopupWindow();
      }
    });

    this._popup
      .querySelector(".popup__close")
      .addEventListener("click", () => this.closePopupWindow());
  }
}

export default Popup;
