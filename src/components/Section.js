class Section {
  constructor({ items, renderer }, selector) {
    this._itemsArray = items;
    this._renderer = renderer;

    this._element = document.querySelector(selector);
  }

  addItem(element) {
    this._element.prepend(element);
  }

  renderItems() {
    this._itemsArray.forEach((item) => {
      this._renderer(item);
    });
  }

  setupItems(items) {
    this._itemsArray = items;
  }
}

export default Section;
