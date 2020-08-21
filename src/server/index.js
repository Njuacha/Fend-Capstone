// used to hide api keys appearing ongithub
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');

const app = express();
// Configure express to use body-parser as middle-ware
const bodyParser = require('./../../node_modules/body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('./../../node_modules/cors');
app.use(cors());

app.use(express.static('dist'));

app.get('/', function (req, res) {
  res.sendFile('dist/index.html');
})

app.listen(8081, function () {
  console.log('app listening on port 8081 !');
})
