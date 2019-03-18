# Insert

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
  <input type="number" name="id" placeholder="id" />
  <input type="text" name="header" placeholder="header" />
  <input type="text" name="content" placeholder="content" />
  <select name="action">
    <option value="append">Append</option>
    <option value="prepend">Prepend</option>
    <option value="append-before">Append before</option>
    <option value="append-after">Append after</option>
  </select>
  <input
    type="number"
    name="reference-id"
    placeholder="reference id"
    style="display: none"
  />
  <button type="submit">Insert</button>
</form>
```

Javascript

```js
import Jaccordion from '@giodelabarrera/jaccordion'
import '@giodelabarrera/jaccordion/dist/css/jaccordion.css'

const jaccordion = new Jaccordion(document.querySelector('dl'))
jaccordion.mount()

const form = document.querySelector('form')
const idElem = form.children[0]
const headerElem = form.children[1]
const contentElem = form.children[2]
const actionElem = form.children[3]
const referenceIdElem = form.children[4]

actionElem.addEventListener('change', function() {
  const allows = ['append-before', 'append-after']
  if (allows.includes(this.value)) {
    referenceIdElem.style.display = 'inline-block'
  } else {
    referenceIdElem.style.display = 'none'
  }
})

form.addEventListener('submit', function(e) {
  e.preventDefault()
  const id = parseInt(idElem.value)
  const header = headerElem.value
  const content = contentElem.value
  const referenceId = parseInt(referenceIdElem.value)
  const entry = {id, header, content}
  switch (actionElem.value) {
    case 'append':
      jaccordion.append(entry)
      break
    case 'prepend':
      jaccordion.prepend(entry)
      break
    case 'append-before':
      jaccordion.appendBefore(entry, referenceId)
      break
    case 'append-after':
      jaccordion.appendAfter(entry, referenceId)
      break
  }
})
```
