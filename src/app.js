import './style.css';
import {
  handleDisplayWriteNumber,
  handleDisplayWriteOperator,
  handleDisplayClear,
  handleDisplayPercent,
  handleDisplayChangeSign,
  handleDisplayEqual,
  handleDisplayWriteDot
} from './components/display.js';
import calculate from './components/calculation.js';

const display = document.querySelector('.calc-display');
const numbers = document.querySelectorAll('.btn-num');
const operators = document.querySelectorAll('.btn-operator');
const clear = document.querySelector('.btn-clear');
const percent = document.querySelector('.btn-percent');
const changeSign = document.querySelector('.btn-change-sign');
const dot = document.querySelector('.btn-dot');
const equal = document.querySelector('.btn-equal');

const operators_array = Array.from(operators).map(
  (operator) => operator.textContent
);

numbers.forEach((button) => {
  button.addEventListener('click', () => {
    handleDisplayWriteNumber(display, button.textContent);
  });
});

operators.forEach((button) => {
  button.addEventListener('click', () => {
    handleDisplayWriteOperator(display, button.textContent, operators_array);
  });
});

clear.addEventListener('click', () => {
  handleDisplayClear(display);
});

percent.addEventListener('click', () => {
  handleDisplayPercent(display, operators_array);
});

changeSign.addEventListener('click', () => {
  handleDisplayChangeSign(display, operators_array);
});

dot.addEventListener('click', () => {
  handleDisplayWriteDot(display);
});

equal.addEventListener('click', () => {
  const result = calculate(display.textContent, operators);
  handleDisplayEqual(display, result);
});

const theme = document.querySelector('.btn-change-theme');

theme.addEventListener('click', () => {
  document.body.classList.toggle('light');
});

addEventListener('keydown', (event) => {
  if (event.key >= '0' && event.key <= '9') {
    handleDisplayWriteNumber(display, event.key);
    return;
  }

  if (operators_array.includes(event.key)) {
    handleDisplayWriteOperator(display, event.key, operators_array);
    return;
  }

  switch (event.key) {
    case '%':
      handleDisplayPercent(display, operators_array);
      break;
    case '.':
      handleDisplayWriteDot(display);
      break;
    case 'Enter':
      handleDisplayEqual(
        display,
        calculate(display.textContent, operators_array)
      );
      break;
    case 'Escape':
      handleDisplayClear(display);
      break;
  }
});
