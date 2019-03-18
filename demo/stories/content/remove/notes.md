# Remove

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
  <select name="section">
    <option value="0">Section 1</option>
    <option value="1">Section 2</option>
    <option value="2">Section 3</option>
  </select>
  <button type="submit">Remove</button>
</form>
```

Javascript

```js
const jaccordion = new Jaccordion(document.querySelector('dl'))
jaccordion.mount()

const form = document.querySelector('form')
const sectionElem = form.children[0]

form.addEventListener('submit', function(e) {
  e.preventDefault()
  const id = parseInt(sectionElem.value)
  jaccordion.remove(id)
})
```
