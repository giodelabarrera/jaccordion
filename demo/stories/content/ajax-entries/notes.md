# Ajax entries

HTML

```html
<dl></dl>
```

Javascript

```js
import Jaccordion from '@giodelabarrera/jaccordion'
import '@giodelabarrera/jaccordion/dist/css/jaccordion.css'

const options = {
  ajax: {
    url: 'https://api.github.com/search/repositories?q=javascript+language:javascript&sort=stars&order=desc',
    processResults: ({items}) => {
      return items.map(({id, full_name: header, description: content}) => ({
        id,
        header,
        content
      }))
    }
  }
}
const jaccordion = new Jaccordion(document.querySelector('dl'), options)
;(async () => {
  await jaccordion.mount()
})()
```
