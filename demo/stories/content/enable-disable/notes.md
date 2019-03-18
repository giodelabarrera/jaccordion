# Enable/Disable

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
<form>
  <label id="enabled">Enabled<label>
  <input for="enabled" type="checkbox"/>
</form>
```

Javascript

```js
const jaccordion = new Jaccordion(document.querySelector('dl'))
jaccordion.mount()
jaccordion.disable()

const input = document.querySelector('input')
input.addEventListener('change', function() {
  if (this.checked === true) jaccordion.enable()
  else jaccordion.disable()
})
```
