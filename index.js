let findButton = document.querySelector('.selector-find');
let nextButton = document.querySelector('.selector-next');
let prevButton = document.querySelector('.selector-prev');
let parentButton = document.querySelector('.nav-top');
let firstChildButton = document.querySelector('.nav-bottom');
let nextSibling = document.querySelector('.nav-right');
let prevSibling = document.querySelector('.nav-left');
let input = document.querySelector('.selector');
let elements, element, elementNumber;

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
        } catch {
            return;
        }
        if (elements.length === 0) return;
        element = elements[elementNumber];
        setFirstActive();
        setSecondActive();
        activateHighlight(elements[elementNumber]);
    } else if (event.target === nextButton) {
        deactivateHighlight(elements[elementNumber]);
        elementNumber++;
        activateHighlight(elements[elementNumber]);
        setFirstActive();
        setSecondActive()
        element = elements[elementNumber];
    } else if (event.target === prevButton) {
        deactivateHighlight(elements[elementNumber]);
        elementNumber--;
        activateHighlight(elements[elementNumber]);
        setFirstActive();
        setSecondActive()
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
    parentButton.disabled = element.parentElement === null ? true : false;
    firstChildButton.disabled = element.firstElementChild === null ? true : false;
    nextSibling.disabled = element.nextElementSibling === null ? true : false;
    prevSibling.disabled = element.previousElementSibling === null ? true : false;
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

function activateHighlight(element) {
    element.style.outline = 'solid red 5px';
    element.style.backgroundColor = 'lightblue';
}

function deactivateHighlight(element) {
    element.style = '';
}