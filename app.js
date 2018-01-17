let express = require('express');
let app = express();
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

let bars = [
  { name: '1886', image: 'https://farm6.staticflickr.com/5230/5633608374_07ea320ba4.jpg' },
  { name: 'Varnish', image: 'https://farm8.staticflickr.com/7168/6409338719_ed9cb1b5df.jpg' },
  { name: 'Dead Rabbit Grocery and Grog', image: 'https://farm8.staticflickr.com/7400/9681292390_d741b94b64.jpg' }
];

app.get('/', (req, res) => {
  
  res.render('landing');
});

app.get('/bars', (req, res) => {
  res.render('bars', { bars });
});

app.post('/bars', (req, res) => {
  let name = req.body.name;
  let image = req.body.image;
  let newBar = {name: name, image: image};
  bars.push(newBar);
  res.redirect('bars');
});

app.get('/bars/new', (req, res) => {
  res.render('new');
});

app.listen(3000, () => {
  console.log('Tipperary server has started');
});