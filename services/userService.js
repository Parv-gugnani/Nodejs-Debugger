/**
 * User service module for demonstrating Node.js debugging
 * This simulates a database with an in-memory array
 */

// In-memory user database
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 30 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25 },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 40 }
];

// Get user by ID
async function getUserById(id) {
  // Simulate async database operation
  return new Promise((resolve) => {
    setTimeout(() => {
      // Intentional bug: if id is 3, we'll have a delay for debugging practice
      if (id === 3) {
        setTimeout(() => {
          const user = users.find(user => user.id === id);
          resolve(user || null);
        }, 2000);
        return;
      }
      
      const user = users.find(user => user.id === id);
      resolve(user || null);
    }, 500);
  });
}

// Create a new user
async function createUser(userData) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // Validate email format
        if (!validateEmail(userData.email)) {
          throw new Error('Invalid email format');
        }
        
        // Generate a new ID (simple implementation)
        const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
        
        const newUser = {
          id: newId,
          name: userData.name,
          email: userData.email,
          age: userData.age || null
        };
        
        users.push(newUser);
        resolve(newUser);
      } catch (error) {
        reject(error);
      }
    }, 500);
  });
}

// Helper function to validate email
function validateEmail(email) {
  // Simple validation - contains @ and .
  return email.includes('@') && email.includes('.');
}

module.exports = {
  getUserById,
  createUser
};
