require('dotenv').config()
const express = require('express')
const app = express()
require('express-ws')(app)
const path = require('path')
const ejsLayort = require('express-ejs-layouts')
const i18n = require('i18n')
require('../src/config/i18n')(i18n)
const cookieparser = require('cookie-parser')
const passport = require('passport')
require('./config/passport')(passport)
const session = require('express-session')
const flash = require('connect-flash')
const wschat = require('../src/ws-contorler/wschat')

app.set('port', 3000)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(ejsLayort)
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieparser())
// middle ware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
// Express session
app.use(
  session({
    secret: process.env.MYSECREID,
    resave: true,
    saveUninitialized: true
  })
)
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())
// Connect flash
app.use(flash())
const { midflash } = require('../src/config/middle')
app.use(midflash)
// i18n
app.use(i18n.init)
const myi18n = function (req, res, next) {
  if (req.cookies.i18n) {
    res.setLocale(req.cookies.i18n)
  } else {
    i18n.setLocale(req, 'en')
  }
  next()
}
app.use(myi18n)

app.use('/', require('../src/routes/index'))

app.use('/users', require('./routes/users'))

app.ws('/chat', wschat)

app.listen(process.env.PORT || app.get('port'), () => {
  console.log(`http://localhost:${app.get('port')}`)
})
