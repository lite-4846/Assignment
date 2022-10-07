const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

router.get('/', async (req, res) => {
  const contacts = await Contact.find({});
  res.json(contacts);
});

router.post('/', async (req, res) => {
  await Contact.insertMany([
    { name: req.body.name, email: req.body.pass, phone: req.body.phone },
  ]);
  res.status(201).send();
});

module.exports = router;