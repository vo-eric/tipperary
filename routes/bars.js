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

router.post('/', (req, res) => {
  let name = req.body.name;
  let image = req.body.image;
  let desc = req.body.description;
  let newBar = {name: name, image: image, description: desc};
  Bar.create(newBar, (err, newlyCreatedBar) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/bars');
    }
  });
});

router.get('/new', (req, res) => {
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


module.exports = router;
