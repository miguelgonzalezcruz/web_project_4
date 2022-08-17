class Section {
  constructor({ items, renderer }, selector) {
    this._itemsArray = items;
    this._renderer = renderer;

    this._element = document.querySelector(selector);
  }

  addItem(element) {
    this._element.append(element);
  }

  clear() {
    this._element.innerHTML = "";
  }

  renderItems() {
    this.clear();
    this._itemsArray.forEach((item) => {
      this._renderer(item);
    });
  }

  setupItems(items) {
    this._itemsArray = items;
  }
}

export default Section;
