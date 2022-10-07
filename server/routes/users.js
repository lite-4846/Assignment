const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const secret = process.env.ACCESS_TOKEN_SECRET || 'damnimissyou';

router
  .route('/login')
  .get(passport.authenticate('jwt', {session: false}),async (req, res) => {
    return res.status(200).send({
      success: true,
      user: {
        id: req.user._id,
        username: req.user.username,
      }
    })
  })
  .post(async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).send({
        success: false,
        message: 'Could not found the User'
      })
    }

    if(!bcrypt.compare(req.body.password, user.password)){
      return res.status(401).send({
        success: false,
        message: 'Could not found the User'
      })
    }

    const payload = {
      username: user.username,
      id: user._id
    }

    const token = jwt.sign(payload, secret, { expiresIn: "1d"})

    return res.status(200).send({
      success: true,
      message: 'LoggedIn successfully',
      token: 'Bearer ' + token
    })
  });

router.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await new User({
      username: req.body.username,
      password: hashedPassword,
    }).save();

    res.send({
      success: true,
      message: 'User created successfully',
      user: {
        username: user.name,
        id: user._id,
      },
    });
  } catch (err) {
    res.send({
      success: false,
      message: 'Something went wrong',
      error: err,
    });
  }
});



module.exports = router;
