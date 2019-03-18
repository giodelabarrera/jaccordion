# Subscribe

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
const jaccordion = new Jaccordion(document.querySelector('dl'))
jaccordion.on('mount.after', () => {
  alert('Mount correctly!')
})
jaccordion.mount()
jaccordion.on('open.after', item => {
  alert(`Section clicked with id: ${item.id}`)
})
```
