# Jaccordion

Jaccordion is a vanilla Javascript ES6 library with a simple API.

> Jaccordion comes from the name, Jacob 👶 plus accordion

## Demo

Visit [https://giodelabarrera.github.io/jaccordion/](https://giodelabarrera.github.io/jaccordion/) for view the storybook demo.

## Available Scripts

Using NPM scripts

- `start` - Run storybook
- `test` - Run test
- `coverage` - Run test coverage
- `build` - Build library

## Installation

```sh
npm install --save @giodelabarrera/jaccordion
```

## Builds

|               | UMD               | ES Module         |
| ------------- | :---------------- | :---------------- |
| Normal        | jaccordion.js     | jaccordion.esm.js |
| Minified      | jaccordion.min.js | ---               |

## Setup

### Styling

**Using `<link>`**

```html
<link rel="stylesheet" href="node_modules/@giodelabarrera/jaccordion/dist/css/jaccordion.min.css">
```

**Using SASS `@import`**

```scss
@import 'node_modules/@giodelabarrera/jaccordion/dist/sass/jaccordion'
```

### Structure

```html
<dl>
  <dt>Section 1</dt>
  <dd>
    <p>Section 1 Content...</p>
  </dd>
  <dt>Section 2</dt>
  <dd>
    <p>Section 2 Content...</p>
  </dd>
  <dt>Section 3</dt>
  <dd>
    <p>Section 3 Content...</p>
  </dd>
</dl>
```

### Initialization

**Using `<script>`**

```html
<script src="node_modules/@giodelabarrera/jaccordion/dist/jaccordion.min.js"></script>

<script>
  new Jaccordion(document.querySelector('dl')).mount()
</script>
```

**Using ES Modules**


```js
import Jaccordion from '@giodelabarrera/jaccordion'

new Jaccordion(document.querySelector('dl')).mount()
```

## Options

### `openAt`

* @default: `0`
* @type: `Number` 

Identifier of the item that appears open by default

### `multiple`

* @default: `false`
* @type: `Boolean` 

Determines if there may be more than one item open

### `entries`

* @default: `[]`
* @type: `Object[]` 

Entries to make items

### `ajax`

* @default: `[object Object]`
* @type: `Object`

Object for make items by request

```js
ajax: {
  url: '',
  processResults: function(data) {
    return data
  }
},
```

### `classes`

* @default: `[object Object]`
* @type: `Object`

Object with classes for styles

```js
classes: {
  root: 'jaccordion',
  header: 'jaccordion__header',
  opened: 'jaccordion__header--opened',
  content: 'jaccordion__content'
}
```

## API

### `.mount()`

Mount the accordion with your items. Add styles and bind events

### `.disable()`

Disable the accordion

### `.enable()`

Enable the accordion

### `.toggle(id)`

* @param: `Number id`

Toogle item (open or close)

### `.isOpen(id)`

* @param: `Number id`

Indicates if a item is open

### `.open(id)`

* @param: `Number id`

Open item

### `.close(id)`

* @param: `Number id`

Close item

### `.append(entry)`

* @param: `Object entry`
* @param: `Number entry.id`
* @param: `String entry.header`
* @param: `String entry.content`

Append a item from entry

### `.prepend(entry)`

* @param: `Object entry`
* @param: `Number entry.id`
* @param: `String entry.header`
* @param: `String entry.content`

Prepend a item from entry

### `.appendBefore(entry, referenceId)`

* @param: `Object entry`
* @param: `Number entry.id`
* @param: `String entry.header`
* @param: `String entry.content`
* @param: `Number referenceId`

Append a item before of an item from entry

### `.appendAfter(entry, referenceId)`

* @param: `Object entry`
* @param: `Number entry.id`
* @param: `String entry.header`
* @param: `String entry.content`
* @param: `Number referenceId`

Append a item after of an item from entry

### `.remove(id)`

* @param: `Number id`

Remove an item from id

### `.on(event, handler)`

* @param: `String event`
* @param: `Function handler`

Subscribe a handler to an event

### `.unmount()`

Unmount the accordion. Remove styles and associated events

## Events

Jaccordion has events that occur during its methods. To add a certain behavior of your own in a certain phase you can do it using the method `.on(event, handler)`.

```js
const jaccordion = new Jaccordion(document.querySelector('dl'))

jaccordion.on('mount.after', () => {
  console.log('Mount correctly!')
})

jaccordion.mount()
```

### `mount.before`

It is called before starting to mount the items

### `mount.after`

It is called once having mounted the items

### `open.before`

Arguments:

* `{Object} item`

It is called before opening the item

### `open.after`

Arguments:

* `{Object} item`

It is called after opening the item

### `close.before`

Arguments:

* `{Object} item`

It is called before closing the item

### `close.after`

Arguments:

* `{Object} item`

It is called after closing the item

### `append`

Arguments:

* `{Object} item`

It is called after adding new item

### `prepend`

Arguments:

* `{Object} item`

It is called after adding new item

### `appendBefore`

Arguments:

* `{Object} item`

It is called after adding new item

### `appendAfter`

Arguments:

* `{Object} item`

It is called after adding new item

### `remove.before`

Arguments:

* `{Object} item`

It is called before removing the item

### `remove.after`

Arguments:

* `{Number} id`

It is called after removing the item

### `unmount`

It is called when it has finished unmounting

### `ajaxEntries.before`

It is called before making ajax request

### `ajaxEntries.success`

It is called after having finished the request of ajax

## Author

Giorgio de la Barrera [https://github.com/giodelabarrera](https://github.com/giodelabarrera)