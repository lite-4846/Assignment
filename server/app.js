const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const passport = require('passport');

const app = express();

const contacts = require('./routes/contacts');
const users = require('./routes/users');
const { urlencoded } = require('express');

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/test').then(() => {
    console.log('connected');
  });
}

app.use(express.json());
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(passport.initialize())

require('./passport');

app.use('/api/contacts', contacts);
app.use('/api/users', users);

function createCookie(name, value, days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    var expires = '; expires=' + date.toGMTString();
  } else var expires = '';
  document.cookie = name + '=' + value + expires + '; path=/';
}

app.all('*', (req, res) => {
  res.send('Page not Found', 404);
});

app.listen(3000);
