const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Allows all origins, adjust as needed

// Define your routes
app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from server' });
});

app.listen(8080, () => {
  console.log('Server running on port 8080');
});
