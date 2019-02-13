import createAccordion from "./src/createAccordion";
import Accordion from "./src/Accordion";

// const element = document.querySelector('dl');
// window.accordion = initAccordion(listElem);

// const markup = `
//   <dl>  
//     <dt>Section 1</dt>
//     <dd>
//       <p>Section 1 Content...</p>
//     </dd>
//     <dt>Section 2</dt>
//     <dd>
//       <p>Section 2 Content...</p>
//     </dd>
//     <dt>Section 3</dt>
//     <dd>
//       <p>Section 3 Content...</p>
//     </dd>
//   </dl>
// `

// const loops = 10;
// let listHtml = '';
// window.accordions = [];

// const type = 2;

// if (type === 1) {
//   console.time('functional');
//   for (let i = 0; i < loops; i++) {
//     listHtml += markup
//   }
//   document.body.innerHTML = listHtml;
//   const lists = Array.from(document.querySelectorAll('dl'));
//   const len = lists.length;
//   for (let i = 0; i < len; i++) {
//     accordions.push(createAccordion(lists[i]));
//   }
//   console.timeEnd('functional');
// }
// else if (type === 2) {
//   console.time('OOP');
//   for (let i = 0; i < loops; i++) {
//     listHtml += markup
//   }
//   document.body.innerHTML = listHtml;
//   const lists = Array.from(document.querySelectorAll('dl'));
//   const len = lists.length;
//   for (let i = 0; i < len; i++) {
//     accordions.push(new Accordion(lists[i]));
//   }
//   console.timeEnd('OOP');
// }





const elem = document.getElementById('first');
window.accordion = new Accordion(elem);
// window.firstAccordion = createAccordion(elem);

// const secondElem = document.getElementById('second');
// window.secondAccordion = createAccordion(secondElem);