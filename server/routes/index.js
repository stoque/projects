'use strict';

const express = require('express');
const router = express.Router();

let data = require('../data/projects.json');

router.get('/', (req, res) => res.json(data));

router.post('/', (req, res) => {
  data.push({
    name: req.body.name,
    type: req.body.type,
    architecture: req.body.architecture,
    enviroments: {
      dev: req.body.dev,
      hmg: req.body.hmg,
      prod: req.body.prod
    }
  })
  res.json(data);
})

module.exports = router;
