# Entries

HTML

```html
<dl></dl>
```

Javascript

```js
const options = {
  entries: [
    {id: 0, header: 'Entry 1', content: 'Entry 1 Content...'},
    {id: 1, header: 'Entry 2', content: 'Entry 2 Content...'},
    {id: 2, header: 'Entry 3', content: 'Entry 3 Content...'}
  ]
}
const jaccordion = new Jaccordion(document.querySelector('dl'), options)
jaccordion.mount()
```
