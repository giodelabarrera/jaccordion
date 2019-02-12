import { makeIsTagElementName } from "./utils/dom";
import Item from "./Item";

const isDTElement = makeIsTagElementName('dt');

export default class Accordion {
  constructor(element) {
    this.element = element;
    this.currentItems = [];

    this.init();
  }

  getItems() {
    return this.currentItems;
  }

  init() {
    const children = Array.from(this.element.children);

    this.currentItems = children
      .filter(isDTElement)
      .map(header => {
        const content = header.nextElementSibling;
        return new Item({ header, content })
      });
  }
}
