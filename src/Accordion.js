import { makeIsTagElementName } from "./utils/dom";
import Item from "./Item";

const isDTElement = makeIsTagElementName('dt');

export default class Accordion {
  constructor(element) {
    this._element = element;
    this._items = [];

    this.init();
  }

  get items() {
    return this._items;
  }

  init() {
    const children = Array.from(this._element.children);

    this._items = children
      .filter(isDTElement)
      .map(header => {
        const content = header.nextElementSibling;
        return new Item({ header, content })
      });
  }
}
