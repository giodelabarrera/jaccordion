# Toggle

Markup

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
<div class="actions">
  <button>Toggle Section 1</button>
  <button>Toggle Section 2</button>
  <button>Toggle Section 3</button>
</div>
```

Script

```js
import Jaccordion from '@giodelabarrera/jaccordion'
import '@giodelabarrera/jaccordion/dist/css/jaccordion.css'

const jaccordion = new Jaccordion(document.querySelector('dl'))
jaccordion.mount()

const actions = document.querySelector('.actions')
const children = Array.from(actions.children)
children.forEach((child, index) =>
  child.addEventListener('click', () => jaccordion.toggle(index))
)
```