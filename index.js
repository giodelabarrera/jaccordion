import createAccordion from "./src/createAccordion";


// const element = document.querySelector('dl');
// window.accordion = initAccordion(listElem);

const elem = document.getElementById('first');
// window.accordion = createAccordion(elem);
window.firstAccordion = createAccordion(elem);

const secondElem = document.getElementById('second');
window.secondAccordion = createAccordion(secondElem);