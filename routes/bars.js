let express   = require('express'),
    router    = express.Router(),
    Bar       = require('../models/bar');

router.get('/', (req, res) => {
  Bar.find({}, (err, bars) => {
    if (err) {
      console.log(err);
    } else {
      res.render('bars/index', {bars});
    }
  });
});

router.post('/', isLoggedIn,(req, res) => {
  let name = req.body.name;
  let image = req.body.image;
  let desc = req.body.description;
  let author = {
    id: req.user._id,
    username: req.user.username
  }
  let newBar = {name: name, image: image, description: desc, author: author};
  Bar.create(newBar, (err, newlyCreatedBar) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/bars');
    }
  });
});

router.get('/new', isLoggedIn, (req, res) => {
  res.render('bars/new');
});

router.get('/:id', (req, res) => {
  Bar.findById(req.params.id).populate('comments').exec((err, chosenBar) => {
    if (err) {
      console.log(err);
    } else {
      res.render('bars/show', { bar: chosenBar })
    }
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}


module.exports = router;
