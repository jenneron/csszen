import './style.css';
import './panel.css';

const findButton = document.querySelector('.selector-find');
const nextButton = document.querySelector('.selector-next');
const prevButton = document.querySelector('.selector-prev');
const parentButton = document.querySelector('.nav-top');
const firstChildButton = document.querySelector('.nav-bottom');
const nextSibling = document.querySelector('.nav-right');
const prevSibling = document.querySelector('.nav-left');
const input = document.querySelector('.selector');
let elements;
let element;
let elementNumber;

function setFirstActive() {
  if (elements.length === 1 || elements === undefined) {
    nextButton.disabled = true;
    prevButton.disabled = true;
  } else if (elementNumber === 0) {
    nextButton.disabled = false;
    prevButton.disabled = true;
  } else if (elements.length - 1 === elementNumber) {
    nextButton.disabled = true;
    prevButton.disabled = false;
  } else if (elementNumber > 0) {
    nextButton.disabled = false;
    prevButton.disabled = false;
  }
}

function setSecondActive() {
  parentButton.disabled = element.parentElement === null;
  firstChildButton.disabled = element.firstElementChild === null;
  nextSibling.disabled = element.nextElementSibling === null;
  prevSibling.disabled = element.previousElementSibling === null;
}

function setFirstInactive() {
  nextButton.disabled = true;
  prevButton.disabled = true;
}

function setSecondInactive() {
  parentButton.disabled = true;
  firstChildButton.disabled = true;
  nextSibling.disabled = true;
  prevSibling.disabled = true;
}

function activateHighlight(el) {
  const newElement = el;
  newElement.style.outline = 'solid red 5px';
  newElement.style.backgroundColor = 'lightblue';
}

function deactivateHighlight(el) {
  const newElement = el;
  newElement.style = '';
}

document.addEventListener('click', event => {
  if (event.target === findButton) {
    if (element !== undefined) {
      deactivateHighlight(element);
      elements = undefined;
    }
    elementNumber = 0;
    if (input.value === '') return;
    try {
      elements = document.querySelectorAll(input.value);
    } catch (e) {
      setFirstActive();
      setSecondInactive();
      return;
    }
    if (elements.length === 0) {
      setFirstActive();
      setSecondInactive();
      return;
    }
    element = elements[elementNumber];
    setFirstActive();
    setSecondActive();
    activateHighlight(elements[elementNumber]);
  } else if (event.target === nextButton) {
    deactivateHighlight(elements[elementNumber]);
    elementNumber += 1;
    activateHighlight(elements[elementNumber]);
    setFirstActive();
    element = elements[elementNumber];
    setSecondActive();
  } else if (event.target === prevButton) {
    deactivateHighlight(elements[elementNumber]);
    elementNumber -= 1;
    activateHighlight(elements[elementNumber]);
    setFirstActive();
    setSecondActive();
    element = elements[elementNumber];
  } else if (event.target === parentButton) {
    setFirstInactive();
    deactivateHighlight(element);
    element = element.parentElement;
    activateHighlight(element);
    setSecondActive();
  } else if (event.target === firstChildButton) {
    setFirstInactive();
    deactivateHighlight(element);
    element = element.firstElementChild;
    activateHighlight(element);
    setSecondActive();
  } else if (event.target === nextSibling) {
    setFirstInactive();
    deactivateHighlight(element);
    element = element.nextElementSibling;
    activateHighlight(element);
    setSecondActive();
  } else if (event.target === prevSibling) {
    setFirstInactive();
    deactivateHighlight(element);
    element = element.previousElementSibling;
    activateHighlight(element);
    setSecondActive();
  }
});
