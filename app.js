let express           = require('express'),
    app               = express(),
    bodyParser        = require('body-parser'),
    mongoose          = require('mongoose'),
    passport          = require('passport'),
    flash             = require('connect-flash'),
    methodOverride    = require('method-override');
    LocalStrategy     = require('passport-local'),
    User              = require('./models/user'),
    Bar               = require('./models/bar'),
    Comment           = require('./models/comment'),
    seedDb            = require('./seeds');

let commentRoutes     = require('./routes/comments'),
    barRoutes         = require('./routes/bars'),
    authRoutes        = require('./routes/auth');



mongoose.connect('mongodb://localhost/tipperary');
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride("_method"));
app.use(flash());
// seedDb();

app.use(require('express-session')({
  secret: 'Irish Whisky Green Chartreuse Sweet Vermouth',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

app.use(authRoutes);
app.use('/bars', barRoutes);
app.use('/bars/:id/comments', commentRoutes);



app.listen(3000, () => {
  console.log('Tipperary server has started');
});
