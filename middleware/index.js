let Bar        = require('../models/bar'),
    Comment    = require('../models/comment');

let middlewareObject = {};

middlewareObject.checkOwnership = function (req, res, next) {
  if (req.isAuthenticated()) {
    Bar.findById(req.params.id, (err, foundBar) => {
      if (err || !foundBar) {
        req.flash('error', 'That bar does not exist');
        res.redirect('back');
      } else {
        if (foundBar.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash('error', "You don't have permission to do that");
          res.redirect('back');
        }
      }
    });
  } else {
    req.flash('error', 'You must be logged in.')
    res.redirect('back');
  }
};

middlewareObject.checkCommentOwnership = function (req, res, next) {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
      if (err || !foundComment) {
        req.flash('error', 'Comment not found');
        res.redirect('back');
      } else {
        if (foundComment.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash('error', "You don't have permission to do that");
          res.redirect('back');
        }
      }
    });
  } else {
    req.flash('You must be logged in');
    res.redirect('back');
  }
};

middlewareObject.isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error', 'You must be logged in');
  res.redirect('/login');
};


module.exports = middlewareObject;
