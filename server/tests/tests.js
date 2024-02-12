const axios = require('axios');

async function runTests() {
  try {
    const response1 = await axios.get('http://localhost:4000/api/users');
    console.log('Test 1:', response1.status === 200 && response1.data.length === 0 ? 'Passed' : 'Failed');

    const newUser = { username: 'John', age: 30 };
    const response2 = await axios.post('http://localhost:4000/api/users', newUser);
    console.log('Test 2:', response2.status === 201 && response2.data.username === newUser.username ? 'Passed' : 'Failed');

    const response3 = await axios.get(`http://localhost:4000/api/users/${response2.data.id}`);
    console.log('Test 3:', response3.status === 200 && response3.data.id === response2.data.id ? 'Passed' : 'Failed');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

runTests();
