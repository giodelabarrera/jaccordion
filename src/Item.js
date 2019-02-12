
export default class Item {  
  constructor({
    header,
    content,
    isOpened = false
  }) {
    this.currentHeader = header;
    this.currentContent = content;
    this.currentIsOpened = isOpened; 

    this.init();
  }

  toggle() {
    this.currentHeader.classList.contains('is-opened') ? this.close() : this.open();
  }

  open() {
    this.currentIsOpened = true;
    this.currentHeader.classList.add('is-opened');
  }

  close() {
    this.currentIsOpened = false;
    this.currentHeader.classList.remove('is-opened');
  }

  getHeader() {
    return this.currentHeader;
  }

  getContent() {
    return this.currentContent;
  }

  getIsOpened() {
    return this.currentIsOpened;
  }

  handleClick(event) {
    this.toggle();
  }

  init() {
    this.currentHeader.addEventListener('click', this.handleClick.bind(this))
  }
}