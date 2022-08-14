class Section {
  constructor({ items, renderer }, selector) {
    this._itemsArray = items;
    this._renderer = renderer;

    this._element = document.querySelector(selector);
  }

  addItem(element) {
    // Añade items
    this._element.prepend(element);
  }

  clear() {
    this._element.innerHTML = "";
  }

  renderItems() {
    // Pinta items
    this.clear();
    this._itemsArray.forEach((item) => {
      this._renderer(item);
    });
  }

  setupItems(items) {
    // Establece items
    this._itemsArray = items;
  }
}

export default Section;
