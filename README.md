
Contrato

- Poder crear sub acordeones
- Poder sobreescribir estilos
- Responsive adaptable
- Que se pueda usar de manera tactil
- Performance
- Dar hooks de eventos del acordion
- Documentacion


- Generar typings para typescript
- testing con jest
- utilizar linters
- Compatible para UMD y ES modules (Rollup)
- Alto coverage
- composicion
- subida de npm


# Options

## multiExpand

(default: false), permite que pueda haber abierto mas de una sección.

```js
multiExpand: true,
```

## allowAllClosed

(default: true), si es true permite que todas las secciones esten cerradas.
Desactiva el cerrado de una seccion si ya esta abierto.

## data

(default: null)
Permite cargar un acordeon desde un array.

```js
data: [
  {
    id: 1,
    title: 'Section 1',
    content: 'Texto',
    expanded: true,
  },
  {
    id: 2,
    title: 'Section 2',
    content: '<p>Esto es un parrafo</p>',
  },
  {
    id: 3,
    title: 'Section 3 con subacordeon',
    children: [
      {
        id: 31,
        title: 'Subsection 1',
        content: 'Texto',
        expanded: true,
      },
      {
        id: 32,
        title: 'Subsection 2',
        content: '<p>Esto es un parrafo</p>',
      },  
    ],
    expanded: false,
  },
  {
    id: 4,
    title: 'Section 2',
    content: '<p>Esto es un parrafo</p>',
    disabled: true,
  },
]
```

## disabled

(default: false)
Desabilita que cualquier title pueda clicarse.


## ?templateItems

Permite crear items de acordeon a partir de un marcado.

```js
templateItems: `
  <dt>1</dt>
  <dd>Content</dd>
  <dt data-expanded>2</dt>
  <dd>Content</dd>
  <dt>3</dt>
  <dd>Content</dd>
`
```

## Caracteristicas

### Abierto alguno

Aparecerá abierto una sección al indicar el atributo `expanded`.

```html
<dl>
  <dt>1</dt>
  <dd>Content</dd>
  <dt data-expanded>2</dt>
  <dd>Content</dd>
  <dt>3</dt>
  <dd>Content</dd>
</dl>
```

### Desabilitado alguno

Aparecerá desabilitado una sección al indicar el atributo `data-disabled`.

```html
<dl>
  <dt data-disabled>1</dt>
  <dd>Content</dd>
  <dt>2</dt>
  <dd>Content</dd>
  <dt>3</dt>
  <dd>Content</dd>
</dl>
```

### Subacordeon

Si se quiere subacordeones se deberá agregar la opción `data-accordion` en el subelemento.

```html
<dl>
  <dt>1</dt>
  <dd>Content</dd>
  <dt>2</dt>
  <dd>
    <dl data-accordion>
      <dt>2.1</dt>
      <dd>Subcontent</dd>
      <dt>2.2</dt>
      <dd>
        <h3>Beatles</h3>
        <dl>
          <dt>Paul McCarney</dt>
          <dd>Baterista</dd>
          <dt>Jhon Lennon</dt>
          <dd>Cantante</dd>
          ...
        </dl>
      </dd>
      <dt>2.3</dt>
      <dd>Subcontent</dd>
    </dl>
  </dd>
  <dt>3</dt>
  <dd>Content</dd>
</dl>
```

---

# Jaccordion


## options

- `multiExpand`

```html
<dl>
  ...
</dl>
```

```js
initAccordion(document.querySelector('dl'), { multiExpand: true });
```

- `allowAllClosed`

```html
<dl>
  ...
</dl>
```

```js
initAccordion(document.querySelector('dl'), { allowAllClosed: true });
```

- `items`

```html
<dl id="empty-accordion"></dl>

<dl id="accordion-markup">
  <dt>Section</dt>
  <dd>Description</dd>
</dl>
```

```js
const items = [
  {
    title: 'Section 1',
    content: 'Description',
    expanded: true,
  },
  {
    title: 'Section 2',
    content: '<p>Lorem ipsum</p>',
  },
  {
    title: 'Section 3',
    content: 'Description',
    disabled: true,
  },
  {
    title: 'Section 4',
    content: {
      ajax: {
        url: 'http://www.randomtext.me/api/',
        proccessResult: (data) => text_out,
      }
    }
  },
];

// dt and dd from items
initAccordion(document.getElementById('empty-accordion'), { items });

// append dt and dd from items
initAccordion(document.getElementById('accordion-markup'), { items });
```

- `ajax`

```html
<dl></dl>
```

```js
initAccordion(document.querySelector('dl'), { 
  ajax: {
    url: '',

  }
});
```