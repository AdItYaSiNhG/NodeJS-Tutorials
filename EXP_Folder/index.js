const express = require('express');
//this app is like a handler function just as in SERVER folder index.js file
const app = express();

app.get('/', (req, res) => {
  res.send('Hello home page');
});

app.get('/about', (req, res) => {
  res.send('Hello about page');
});

const PORT  = 3000;
app.listen(PORT, () => {
  console.log('Server is running on port:', PORT);
});

// now express framework makes it easy to create a server and handle requests
//in-built query parameters, body parser, etc. are available in express