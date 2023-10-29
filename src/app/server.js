const express = require('express');
const app = express();
const cors = require('cors'); // Import the cors middleware
const bodyParser = require('body-parser');
const fs = require('fs'); // Require the fs module

const port = 3001;
const corsOptions = {
    origin: 'http://localhost:3000', // Replace with the origin of your React app
  };
  
  app.use(cors(corsOptions));
  

app.use(bodyParser.json());

app.post('/saveResponse', (req, res) => {
  try {
    const response = req.body.response;
    const responses = JSON.parse(fs.readFileSync('./answers.json', 'utf-8'));
    responses.push(response);
    fs.writeFileSync('./answers.json', JSON.stringify(responses, null, 2), 'utf-8');
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
