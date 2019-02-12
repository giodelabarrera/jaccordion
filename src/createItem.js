
/**
 *
 *
 * @export
 * @param {*} {
 *   header,
 *   content,
 *   isOpened = false
 * }
 * @returns
 */
export default function createItem({
  header,
  content,
  isOpened = false
}) {
  let currentHeader = header;
  let currentContent = content;
  let currentIsOpened = isOpened;

  /**
   *
   *
   */
  function toggle() {
    currentHeader.classList.contains('is-opened') ? close() : open();
  }

  /**
   *
   *
   */
  function open() {
    currentIsOpened = true;
    currentHeader.classList.add('is-opened');
  }

  /**
   *
   *
   */
  function close() {
    currentIsOpened = false;
    currentHeader.classList.remove('is-opened');
  }

  /**
   *
   *
   * @returns
   */
  function getHeader() {
    return currentHeader;
  }

  /**
   *
   *
   * @returns
   */
  function getContent() {
    return currentContent;
  }

  /**
   *
   *
   * @returns
   */
  function getIsOpened() {
    return currentIsOpened;
  }

  /**
   *
   *
   * @param {*} event
   */
  function handleClick(event) {
    toggle();
  }

  /**
   *
   *
   */
  function init() {
    currentHeader.addEventListener('click', handleClick)
  }

  init();

  return {
    open,
    close,
    toggle,
    getHeader,
    getContent,
    getIsOpened,
  }
}