# Multiple open

HTML

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

Javascript

```js
const options = {multiple: true}
const jaccordion = new Jaccordion(document.querySelector('dl'), options)
jaccordion.mount()
```
