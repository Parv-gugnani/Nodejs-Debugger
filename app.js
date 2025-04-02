const express = require('express');
const app = express();
const PORT = 3000;

// Enable JSON body parsing
app.use(express.json());

// Collection of debugging scenarios
const debuggingScenarios = {
  // Scenario 1: Simple bug in calculation
  buggyAdd: function(a, b) {
    // Bug: When a is 0, it doesn't add correctly
    if (a === 0) {
      return b;
    }
    return a + b;
  },

  // Scenario 2: Loop debugging
  sumArray: function(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
    }
    return sum;
  },

  // Scenario 3: Async code debugging
  asyncOperation: async function(id) {
    console.log("Starting async operation");

    await new Promise(resolve => setTimeout(resolve, 1000));

    if (id === 3) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      return { id: 3, name: "Special User", delayed: true };
    }

    return { id: id, name: `User ${id}` };
  },

  // Scenario 4: Error handling
  divideNumbers: function(a, b) {
    if (b === 0) {
      throw new Error("Cannot divide by zero");
    }
    return a / b;
  }
};

// Routes to demonstrate debugging

// Home route
app.get('/', (req, res) => {
  res.send('Node.js Debugger POC - Try the different endpoints to practice debugging');
});

// Scenario 1: Debug calculation bug
app.get('/add', (req, res) => {
  const a = parseInt(req.query.a || 0);
  const b = parseInt(req.query.b || 0);

  const result = debuggingScenarios.buggyAdd(a, b);

  res.json({
    operation: 'add',
    a: a,
    b: b,
    result: result,
    expected: a + b
  });
});

// Scenario 2: Debug loop
app.get('/sum-array', (req, res) => {
  // Create array from elements in query string or use default
  const numbers = req.query.numbers
    ? req.query.numbers.split(',').map(n => parseInt(n))
    : [1, 2, 3, 4, 5];

  const result = debuggingScenarios.sumArray(numbers);

  res.json({
    operation: 'sum-array',
    input: numbers,
    result: result
  });
});

// Scenario 3: Debug async code
app.get('/async/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const startTime = Date.now();

    const result = await debuggingScenarios.asyncOperation(id);

    const duration = Date.now() - startTime;

    res.json({
      operation: 'async-operation',
      id: id,
      result: result,
      duration_ms: duration
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Scenario 4: Debug error handling
app.get('/divide', (req, res) => {
  try {
    const a = parseInt(req.query.a || 0);
    const b = parseInt(req.query.b || 1);

    const result = debuggingScenarios.divideNumbers(a, b);

    res.json({
      operation: 'divide',
      a: a,
      b: b,
      result: result
    });
  } catch (error) {
    res.status(400).json({
      operation: 'divide',
      error: error.message
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Debugger POC running at http://localhost:${PORT}`);
  console.log('Ready for debugging practice!');
});