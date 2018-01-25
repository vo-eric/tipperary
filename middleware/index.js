let Bar        = require('../models/bar'),
    Comment    = require('../models/comment');

let middlewareObject = {};

middlewareObject.checkOwnership = function (req, res, next) {
  if (req.isAuthenticated()) {
    Bar.findById(req.params.id, (err, foundBar) => {
      if (err) {
        res.redirect('back');
      } else {
        if (foundBar.author.id.equals(req.user._id)) {
          next();
        } else {
          res.redirect('back');
        }
      }
    });
  } else {
    res.redirect('back');
  }
};

middlewareObject.checkCommentOwnership = function (req, res, next) {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
      if (err) {
        res.redirect('back');
      } else {
        if (foundComment.author.id.equals(req.user._id)) {
          next();
        } else {
          res.redirect('back');
        }
      }
    });
  } else {
    res.redirect('back');
  }
};

middlewareObject.isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};


module.exports = middlewareObject;
