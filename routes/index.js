const express = require('express');
const router = express.Router();
const User = require('../models/User');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const checkAdmin = checkRoles('Boss');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/employees', ensureLoggedIn('/auth/login'), checkAdmin, (req, res, next) => {
  User.find().then(employee => {
    res.render('employees', { employee: employee });
  });
});

function checkRoles(role) {
  return function(req, res, next) {
    if (req.isAuthenticated() && req.user.role === role) {
      return next();
    } else {
      res.redirect('/login');
    }
  };
}

module.exports = router;
