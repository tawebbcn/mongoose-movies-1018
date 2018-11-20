'use strict';

const formMiddleware = {};

formMiddleware.requireFields = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    // Username and password fields can't be empty
    return res.redirect(`/auth${req.path}`);
  }
  next();
};

module.exports = formMiddleware;
