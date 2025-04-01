const express = require('express');
const mathUtils = require('./utils/mathUtils');
const userService = require('./services/userService');

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Node.js Debugger Demo!');
});

app.get('/calculate/:operation', (req, res) => {
  const { operation } = req.params;
  const { a, b } = req.query;

  const num1 = parseInt(a, 10);
  const num2 = parseInt(b, 10);

  let result;

  try {
    switch (operation) {
      case 'add':
        result = mathUtils.add(num1, num2);
        break;
      case 'subtract':
        result = mathUtils.subtract(num1, num2);
        break;
      case 'multiply':
        result = mathUtils.multiply(num1, num2);
        break;
      case 'divide':
        result = mathUtils.divide(num1, num2);
        break;
      default:
        return res.status(400).json({ error: 'Invalid operation' });
    }

    res.json({ operation, num1, num2, result });
  } catch (error) {
    console.error('Calculation error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get('/users/:id', async (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const user = await userService.getUserById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error.message);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
});

app.post('/users', async (req, res) => {
  try {
    const { name, email, age } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const newUser = await userService.createUser({ name, email, age });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error.message);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log('Ready for debugging!');
});
