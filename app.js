var express = require('express')
var path = require('path')
var logger = require('morgan')
var bodyParser = require('body-parser')
var app = express()
var mongoose = require('mongoose')
var passport = require('passport')
var expressSession = require('express-session')
var cookieParser = require('cookie-parser')

// Mongoose Setup
mongoose.connect('mongodb://localhost:27017/facebook-authentication-app')

// Middleware
app.use(cookieParser())
app.use(expressSession({secret: 'mySecretKey'}))
app.use(passport.initialize())
app.use(passport.session())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('views', path.join(__dirname, 'views'))
app.engine('ejs', require('ejs').renderFile)
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))

// Setting up the Passport Strategies
require('./config/passport')(passport)

passport.serializeUser(function(user, done) {
  done(null, user);
})

passport.deserializeUser(function(user, done) {
  done(null, user);
})

// Home page
app.get('/', function (req, res) {
  console.log(req.user)
  res.render('layout', {user: req.user})
})


app.get('/auth/github',
  passport.authenticate('github'))

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });

// Logout
app.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
})


app.listen(3000)
