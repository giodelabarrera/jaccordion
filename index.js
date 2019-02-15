import Jaccordion from './src'

// const button = document.getElementById('mount')

const jaccordion = new Jaccordion(document.getElementById('first'))
jaccordion.mount()

// button.addEventListener('click', function() {
//   jaccordion.mount()
// })

window.jaccordion = jaccordion
