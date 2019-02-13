
export default class Item {
  constructor({
    header,
    content,
    isOpened = false
  }) {
    this._header = header;
    this._content = content;
    this._isOpened = isOpened;

    this.init();
  }

  toggle() {
    this._isOpened ? this.close() : this.open();
  }

  open() {
    this._isOpened = true;
    this._header.classList.add('is-opened');
    return this;
  }

  close() {
    this._isOpened = false;
    this._header.classList.remove('is-opened');
    return this;
  }

  get header() {
    return this._header;
  }

  get content() {
    return this._content;
  }

  get isOpened() {
    return this._isOpened;
  }

  handleClick(event) {
    this.toggle();
  }

  init() {
    this._header.addEventListener('click', this.handleClick.bind(this))
  }
}