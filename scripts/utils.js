export const pressEsc = (e) => {
  if (e.key === "Escape") {
    const popupOpened = document.querySelector(".popup_is-opened");
    closePopupWindow(popupOpened);
  }
};

export const openPopupWindow = (modalWindow) => {
  modalWindow.classList.add("popup_is-opened");
  document.addEventListener("keydown", pressEsc);
};

export const closePopupWindow = (modalWindow) => {
  modalWindow.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", pressEsc);
};
