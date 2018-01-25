let express       = require('express'),
    router        = express.Router(),
    middleware    = require('../middleware'),
    Bar           = require('../models/bar');

//===============================================
//INDEX ROUTE
//===============================================

router.get('/', (req, res) => {
  Bar.find({}, (err, bars) => {
    if (err) {
      console.log(err);
    } else {
      res.render('bars/index', {bars});
    }
  });
});

//===============================================
//CREATE ROUTE
//===============================================
router.post('/', middleware.isLoggedIn, (req, res) => {
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

router.get('/new', middleware.isLoggedIn, (req, res) => {
  res.render('bars/new');
});

//===============================================
//SHOW ROUTE
//===============================================

router.get('/:id', (req, res) => {
  Bar.findById(req.params.id).populate('comments').exec((err, foundBar) => {
    if (err || !foundBar) {
      req.flash('error', 'That bar does not exist');
      res.redirect('back');
    } else {
      res.render('bars/show', { bar: foundBar })
    }
  });
});

//===============================================
//EDIT ROUTE
//===============================================
router.get('/:id/edit', middleware.checkOwnership, (req, res) => {
  Bar.findById(req.params.id, (err, foundBar) => {
    res.render('bars/edit', {bar: foundBar});
  });
});

//===============================================
//UPDATE ROUTE
//===============================================

router.put('/:id', (req, res) => {
  Bar.findByIdAndUpdate(req.params.id, req.body.bar, (err, updatedBar) => {
    if (err) {
      res.redirect('/bars');
    } else {
      res.redirect(`/bars/${req.params.id}`)
    }
  })
});

//===============================================
//DELETE ROUTE
//===============================================

router.delete('/:id', middleware.checkOwnership, (req, res) => {
  Bar.findByIdAndRemove(req.params.id, (err) => {
    if(err) {
      res.redirect('/bars');
    } else {
      res.redirect('/bars');
    }
  });
})

module.exports = router;
