# Combined

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
import Jaccordion from '@giodelabarrera/jaccordion'
import '@giodelabarrera/jaccordion/dist/css/jaccordion.css'

const options = {
  entries: [
    {id: 3, header: 'Entry 4', content: 'Entry 4 Content...'},
    {id: 4, header: 'Entry 5', content: 'Entry 5 Content...'},
    {id: 5, header: 'Entry 6', content: 'Entry 6 Content...'}
  ],
  ajax: {
    url: 'https://api.github.com/repos/storybooks/storybook',
    processResults: ({id, full_name: header, description: content}) => [
      {
        id,
        header,
        content
      }
    ]
  }
}
const jaccordion = new Jaccordion(document.querySelector('dl'), options)
;(async () => {
  await jaccordion.mount()
})()
```
