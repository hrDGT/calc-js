'use strict';

function toRpnArray(expression) {
  const tokens = expression.replace(/[()]/g, '').split(' ');

  const stack = [];
  const operators = [];

  const priority = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2
  };

  for (let token of tokens) {
    if (!isNaN(token)) {
      stack.push(token);
    } else {
      while (
        operators.length > 0 &&
        priority[operators[operators.length - 1]] >= priority[token]
      ) {
        stack.push(operators.pop());
      }
      operators.push(token);
    }
  }

  while (operators.length > 0) {
    stack.push(operators.pop());
  }

  return stack;
}

export default function calculate(expression) {
  const tokens = toRpnArray(expression);
  const stack = [];

  for (let token of tokens) {
    if (!isNaN(token)) {
      stack.push(token);
    } else {
      const operand2 = Number(stack.pop());
      const operand1 = Number(stack.pop());

      switch (token) {
        case '+':
          stack.push(operand1 + operand2);
          break;
        case '-':
          stack.push(operand1 - operand2);
          break;
        case '*':
          stack.push(operand1 * operand2);
          break;
        case '/':
          stack.push(operand1 / operand2);
          break;
      }
    }
  }

  return stack.pop();
}
