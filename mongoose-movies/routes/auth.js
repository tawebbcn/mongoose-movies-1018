'use strict';

const express = require('express');
const router = express.Router();
<<<<<<< HEAD

/* GET home page. */
=======
const User = require('../models/user');

const bcrypt = require('bcrypt');
const saltRounds = 10;

>>>>>>> 2ca4b2c0a2d51603e316dc16eeabeedbc497e370
router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});

<<<<<<< HEAD
=======
router.post('/signup', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.redirect('/auth/signup');
  }
  User.findOne({ username })
    .then((user) => {
      if (user) {
        return res.redirect('/auth/signup');
      }
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);
      User.create({
        username,
        password: hashedPassword
      })
        .then((newUser) => {
          req.session.currentUser = newUser;
          res.redirect('/celebrities');
        })
        .catch(next);
    })
    .catch(next);
});

router.get('/login', (req, res, next) => {
  res.render('auth/login');
});

router.post('/login', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.redirect('/auth/login');
  }
  User.findOne({ username })
    .then((user) => {
      if (!user) {
        return res.redirect('/auth/login');
      }
      if (bcrypt.compareSync(password, user.password)) {
        req.session.currentUser = user;
        res.redirect('/celebrities/new');
      } else {
        res.redirect('/auth/login');
      }
    })
    .catch(next);
});

router.post('/logout', (req, res, next) => {
  delete req.session.currentUser;
  res.redirect('/auth/login');
});

>>>>>>> 2ca4b2c0a2d51603e316dc16eeabeedbc497e370
module.exports = router;
