# Jaccordion

Jaccordion is a library vanilla Javascript ES6 with a simple API.

> Jacordion comes from the name, Jacob 👶 plus accordion

## Demo

Visit [jaccordion.com](http://jaccordion.com) for view the demo.

## Installation

Install the stable version.

```sh
npm install --save jaccordion
```

## Builds

|               | UMD               | ES Module         |
| ------------- | :---------------- | :---------------- |
| Normal        | jaccordion.js     | jaccordion.esm.js |
| Minified      | jaccordion.min.js | ---               |

## Getting started

### Styling

**Using `<link>`**

```html
<link rel="stylesheet" href="node_modules/jaccordion/dist/css/jaccordion.min.css">
```

**Using SASS `@import`**

```scss
@import 'node_modules/jaccordion/src/assets/scss/jaccordion'
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
<script src="node_modules/jaccordion/dist/jaccordion.min.js"></script>

<script>
  new Jaccordion(document.querySelector('dl')).mount()
</script>
```

**Using ES Modules**


```js
import Jaccordion from 'jaccordion'

new Jaccordion(document.querySelector('dl')).mount()
```

## Author

Giorgio de la Barrera [https://github.com/giodelabarrera](https://github.com/giodelabarrera)