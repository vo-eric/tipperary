let express       = require('express'),
    router        = express.Router(),
    passport      = require('passport'),
    User          = require('../models/user');

router.get('/', (req, res) => {
  res.render('landing');
});

router.get('/register', (req, res) => {
  res.render('register', {page: 'register'});
});

router.post('/register', (req, res) => {
  let newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      req.flash('error', err.message);
      return res.redirect('register')
    }
    passport.authenticate('local')(req, res, () => {
      req.flash('success', `Welcome to Tipperary, ${user.username}`);
      res.redirect('/bars');
    });
  });
});

router.get('/login', (req, res) => {
  res.render('login', {page: 'login'});
});

router.post('/login', passport.authenticate('local',
  {
    successRedirect: '/bars',
    failureRedirect: '/login'
  }), (req, res) => {
});

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'You have successfully logged out');
  res.redirect('/bars');
});

module.exports = router;
