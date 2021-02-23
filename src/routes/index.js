const express = require('express')
const route = express.Router()
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth')

// let pushSubdiscription
const webpush = require('../config/webpush')

route.get('/', forwardAuthenticated, (req, res) => res.render('welcome', { i18n: res }))

// Dashboard
route.get('/home', ensureAuthenticated, (req, res) => {
  const head = {
    id: res.__('id'),
    username: res.__('username'),
    email: res.__('email'),
    welcome: res.__('welcome')

  }
  res.render('home', {
    user: req.user.name,
    i18n: res,
    head
  })
})
// Profile
route.get('/profile', ensureAuthenticated, (req, res) => {
  const head = {
    id: res.__('id'),
    username: res.__('username'),
    email: res.__('email'),
    welcome: res.__('welcome'),
    update: res.__('update'),
    confirm: res.__('confirm'),
    password: res.__('password'),
    cancle: res.__('cancle'),
    edit: res.__('edit')
  }
  res.render('profile', {
    user: req.user.name,
    i18n: res,
    head
  })
})

route.get('/th', function (req, res) {
  res.cookie('i18n', 'th')
  res.redirect('/')
})

route.get('/en', function (req, res) {
  res.cookie('i18n', 'en')
  res.redirect('/')
})
route.post('/subscription', async (req, res) => {
  // pushSubdiscription = req.body
  const { msg, pushSubdiscription } = req.body
  // console.log(pushSubdiscription)
  console.log(msg)
  res.status(200).json()

  const payload = JSON.stringify({
    title: msg,
    message: 'Welcome to my App'
  })
  try {
    await webpush.sendNotification(pushSubdiscription, payload)
  } catch (error) {
    console.log(error)
  }
})

module.exports = route
