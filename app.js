let express       = require('express'),
    app           = express(),
    bodyParser    = require('body-parser'),
    mongoose      = require('mongoose'),
    Bar           = require('./models/bar')


mongoose.connect('mongodb://localhost/tipperary');
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('landing');
});

app.get('/bars', (req, res) => {
  Bar.find({}, (err, bars) => {
    if (err) {
      console.log(err);
    } else {
      res.render('index', { bars });
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
  res.render('new');
});

app.get('/bars/:id', (req, res) => {
  Bar.findById(req.params.id, (err, chosenBar) => {
    if (err) {
      console.log(err);
    } else {
      res.render('show', { bar: chosenBar })
    }
  });
});


app.listen(3000, () => {
  console.log('Tipperary server has started');
});
