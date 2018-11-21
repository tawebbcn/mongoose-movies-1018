'use strict';

const express = require('express');
const router = express.Router();

/* GET home page. */
const bcrypt = require('bcrypt');

const User = require('../models/user');
const authMiddleware = require('../middlewares/authMiddleware');
const formMiddleware = require('../middlewares/formMiddleware');

const saltRounds = 10;

router.get('/signup', authMiddleware.requireAnon, (req, res, next) => {
  res.render('auth/signup');
});

router.post('/signup', authMiddleware.requireAnon, formMiddleware.requireFields, (req, res, next) => {
  const { username, password } = req.body;
  User.findOne({ username })
    .then((user) => {
      if (user) {
        // Username already taken
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

router.post('/logout', authMiddleware.requireUser, (req, res, next) => {
  console.log('EDIT');
  delete req.session.currentUser;
  // redirect to login after log out
  res.redirect('/auth/login');
});

router.get('/login', authMiddleware.requireAnon, (req, res, next) => {
  res.render('auth/login');
});

router.post('/login', authMiddleware.requireAnon, formMiddleware.requireFields, (req, res, next) => {
  const { username, password } = req.body;
  User.findOne({ username })
    .then((user) => {
      if (!user) {
        // User not found
        return res.redirect('/auth/login');
      }
      if (bcrypt.compareSync(password, user.password)) {
        // Username or password incorrect
        req.session.currentUser = user;
        res.redirect('/celebrities/new');
      } else {
        res.redirect('/auth/login');
      }
    })
    .catch(next);
});

module.exports = router;
