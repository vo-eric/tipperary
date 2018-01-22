let express         = require('express'),
    router          = express.Router({mergeParams: true}),
    Bar             = require('../models/bar'),
    Comment         = require('../models/comment');


router.get('/new', isLoggedIn, (req, res) => {
  Bar.findById(req.params.id, (err, bar) => {
    if (err) {
      console.log(err);
    } else {
      res.render('comments/new', { bar });
    }
  })
});

router.post('/', isLoggedIn, (req, res) => {
  Bar.findById(req.params.id, (err, bar) => {
    if (err) {
      console.log(err);
      res.redirect('/bars');
    } else {
      Comment.create(req.body.comment, (err, comment) => {
        if (err) {
          console.log(err);
        } else {
          comment.author.id = req.user._id;
          comment.auther.username = req.user.username;
          comment.save();
          bar.comments.push(comment._id);
          bar.save();
          res.redirect(`/bars/${bar._id}`)
        }
      });
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
