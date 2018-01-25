let express         = require('express'),
    router          = express.Router({mergeParams: true}),
    middleware      = require('../middleware'),
    Bar             = require('../models/bar'),
    Comment         = require('../models/comment');

//======================================
//COMMENT NEW ROUTE
//======================================
router.get('/new', middleware.isLoggedIn, (req, res) => {
  Bar.findById(req.params.id, (err, bar) => {
    if (err) {
      console.log(err);
    } else {
      res.render('comments/new', { bar });
    }
  })
});

//======================================
//COMMENT POST ROUTE
//======================================
router.post('/', middleware.isLoggedIn, (req, res) => {
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
          comment.author.username = req.user.username;
          comment.save();
          bar.comments.push(comment._id);
          bar.save();
          res.redirect(`/bars/${bar._id}`)
        }
      });
    }
  });
});

//======================================
//COMMENT EDIT ROUTE
//======================================
router.get('/:comment_id/edit', middleware.checkCommentOwnership, (req, res) => {
  Comment.findById(req.params.comment_id, (err, foundComment) => {
    if (err) {
      res.redirect('back');
    } else {
      res.render('comments/edit', {bar_id: req.params.id, comment: foundComment});
    }
  })
});

//======================================
//COMMENT UPDATE ROUTE
//======================================
router.put('/:comment_id', (req, res) => {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment)=> {
    if (err) {
      res.redirect('back');
    } else {
      res.redirect(`/bars/${req.params.id}`);
    }
  });
});

//======================================
//COMMENT DESTEROY ROUTE
//======================================
router.delete('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
  Comment.findByIdAndRemove(req.params.comment_id, (err) => {
    if (err) {
      res.redirect('back');
    } else {
      res.redirect(`/bars/${req.params.id}`);
    }
  })
});

module.exports = router;
