import { makeIsTagElementName } from "./utils/dom";
import createItem from "./createItem";

const isDTElement = makeIsTagElementName('dt');

export default function createAccordion(element) {
  let currentItems = [];

  function getItems() {
    return currentItems;
  }

  function init() {
    const children = Array.from(element.children);

    currentItems = children
      .filter(isDTElement)
      .map(header => {
        const content = header.nextElementSibling;
        return createItem({ header, content })
      });
  }

  init();

  return {
    getItems,
  }
}
