/**
 * Math utility functions for demonstrating Node.js debugging
 */

// Function to add two numbers
function add(a, b) {
  // Intentional bug: if a is 0, we return b without adding
  if (a === 0) {
    return b;
  }
  return a + b;
}

// Function to subtract two numbers
function subtract(a, b) {
  return a - b;
}

// Function to multiply two numbers
function multiply(a, b) {
  let result = 0;
  // Intentional inefficient implementation for debugging practice
  for (let i = 0; i < b; i++) {
    result += a;
  }
  return result;
}

// Function to divide two numbers
function divide(a, b) {
  // This will throw an error if b is 0
  if (b === 0) {
    throw new Error('Division by zero is not allowed');
  }
  return a / b;
}

module.exports = {
  add,
  subtract,
  multiply,
  divide
};
