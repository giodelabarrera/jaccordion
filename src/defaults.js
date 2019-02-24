export default {
  openAt: 0,
  entries: [],
  ajax: {
    url: '',
    processResults: data => data
  },
  classes: {
    root: 'jaccordion',
    header: 'jaccordion__header',
    opened: 'jaccordion__header--opened',
    content: 'jaccordion__content'
  }
}
