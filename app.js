let express       = require('express');
    app           = express();
    bodyParser    = require('body-parser');
    mongoose      = require('mongoose');


mongoose.connect('mongodb://localhost/tipperary');
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


let barsSchema = new mongoose.Schema({
  name: String,
  image: String
})

let Bar = mongoose.model('Bar', barsSchema);

// Bar.create(
//   {
//     name: 'Varnish', image: 'https://farm8.staticflickr.com/7168/6409338719_ed9cb1b5df.jpg',
//   }, (err, bar) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("new bar");
//       console.log(bar);
//     }
//   }
// )

app.get('/', (req, res) => {
  res.render('landing');
});

app.get('/bars', (req, res) => {
  Bar.find({}, (err, bars) => {
    if (err) {
      console.log(err);
    } else {
      res.render('bars', { bars });
    }
  });
});

app.post('/bars', (req, res) => {
  let name = req.body.name;
  let image = req.body.image;
  let newBar = {name: name, image: image};
  Bar.create(newBar, (err, newlyCreatedBar) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('bars');
    }
  });
});

app.get('/bars/new', (req, res) => {
  res.render('new');
});

app.listen(3000, () => {
  console.log('Tipperary server has started');
});
