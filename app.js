let express       = require('express'),
    app           = express(),
    bodyParser    = require('body-parser'),
    mongoose      = require('mongoose'),
    Bar           = require('./models/bar'),
    Comment       = require('./models/comment'),
    seedDb        = require('./seeds');

mongoose.connect('mongodb://localhost/tipperary');
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
seedDb();

app.get('/', (req, res) => {
  res.render('landing');
});

app.get('/bars', (req, res) => {
  Bar.find({}, (err, bars) => {
    if (err) {
      console.log(err);
    } else {
      res.render('bars/index', { bars });
    }
  });
});

app.post('/bars', (req, res) => {
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

app.get('/bars/new', (req, res) => {
  res.render('bars/new');
});

app.get('/bars/:id', (req, res) => {
  Bar.findById(req.params.id).populate('comments').exec((err, chosenBar) => {
    if (err) {
      console.log(err);
    } else {
      console.log(chosenBar);
      res.render('bars/show', { bar: chosenBar })
    }
  });
});






// ==========================
// COMMENTS ROUTES
// ==========================

app.get('/bars/:id/comments/new', (req, res) => {
  Bar.findById(req.params.id, (err, bar) => {
    if (err) {
      console.log(err);
    } else {
      res.render('comments/new', { bar });
    }
  })
});

app.post('/bars/:id/comments', (req, res) => {
  Bar.findById(req.params.id, (err, bar) => {
    if (err) {
      console.log(err);
      res.redirect('/bars');
    } else {
      Comment.create(req.body.comment, (err, comment) => {
        if (err) {
          console.log(err);
        } else {
          bar.comments.push(comment._id);
          bar.save();
          res.redirect(`/bars/${bar._id}`)
        }
      });
    }
  });
});


app.listen(3000, () => {
  console.log('Tipperary server has started');
});
