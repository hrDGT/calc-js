'use strict';

function getLastOperatorIndex(text, operators) {
  for (let i = text.length - 1; i >= 0; i--) {
    if (operators.includes(text[i])) {
      return i;
    }
  }
  return -1;
}

export function handleDisplayWriteNumber(display, value) {
  if (
    display.textContent === '0' ||
    display.textContent === '-0' ||
    display.textContent === 'NaN' ||
    display.textContent === 'Infinity'
  ) {
    display.textContent = value;
    return;
  }

  display.textContent += value;
}

export function handleDisplayWriteOperator(display, value, operators) {
  if (display.textContent === 'NaN' || display.textContent === 'Infinity') {
    display.textContent = '0';
    return;
  }

  if (operators.includes(display.textContent.slice(-2, -1))) {
    display.textContent = display.textContent.slice(0, -2) + `${value} `;
  } else {
    display.textContent += ` ${value} `;
  }
}

export function handleDisplayClear(display) {
  display.textContent = '0';
}

export function handleDisplayPercent(display, operators) {
  if (display.textContent === 'NaN' || display.textContent === 'Infinity') {
    display.textContent = '0';
    return;
  }

  const lastOperatorIndex = getLastOperatorIndex(
    display.textContent,
    operators
  );

  if (lastOperatorIndex === -1) {
    display.textContent = `${Number(display.textContent) / 100}`;
  } else {
    display.textContent =
      display.textContent.slice(0, lastOperatorIndex + 2) +
      `${Number(display.textContent.slice(lastOperatorIndex + 2)) / 100}`;
  }
}

export function handleDisplayChangeSign(display, operators) {
  if (display.textContent === 'NaN' || display.textContent === 'Infinity') {
    display.textContent = '0';
    return;
  }

  const text = display.textContent;
  const lastOperatorIndex = getLastOperatorIndex(text, operators);

  if (lastOperatorIndex === -1) {
    display.textContent = `-${text}`;
  } else {
    if (lastOperatorIndex === text.length - 1 || text[text.length - 1] === ' ')
      return;

    if (lastOperatorIndex === 0) {
      display.textContent = text.slice(1);
    } else {
      if (text[lastOperatorIndex - 1] === '(') {
        display.textContent =
          text.slice(0, lastOperatorIndex - 1) +
          `${text.slice(lastOperatorIndex + 1, text.length - 1)}`;
      } else {
        display.textContent =
          text.slice(0, lastOperatorIndex + 2) +
          `(-${text.slice(lastOperatorIndex + 2)})`;
      }
    }
  }
}

export function handleDisplayWriteDot(display) {
  if (display.textContent === 'NaN' || display.textContent === 'Infinity') {
    display.textContent = '0';
    return;
  }

  const lastElement = display.textContent.split(' ').pop();

  if (lastElement !== '' && !isNaN(lastElement) && !lastElement.includes('.')) {
    display.textContent += '.';
  }
}

export function handleDisplayEqual(display, result) {
  display.textContent = result === '' || isNaN(result) ? '0' : result;
}
