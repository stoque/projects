'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 3000;
const routes = require('./routes');
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.json({ message: 'hello' }));

app.use('/projects', routes);

app.listen(port, () => {
  console.log('Listening on port http://localhost:%d', port);
});
