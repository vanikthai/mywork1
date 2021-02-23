const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const passport = require('passport')
const uuid = require('uuid')
const db = require('../config/firebase')
// Load User model
// const User = require('../models/User')
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth')

// Login Page
router.get('/', ensureAuthenticated, (req, res) => res.render('users', {
  user: req.user.name,
  i18n: res
}))

router.get('/login', forwardAuthenticated, (req, res) => res.render('log/logintab', { i18n: res }))
// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('log/logintab', { i18n: res }))

// Register
router.post('/register', async (req, res) => {
  const { rname: name, remail: email, rpassword: password, password2 } = req.body
  const errors = []

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'ข้อมูลยังว่าง' })
  }

  if (password !== password2) {
    errors.push({ msg: 'รหัสผ่านไม่ตรงกัน' })
  }

  if (password.length < 6) {
    errors.push({ msg: 'ต้องใช้รหัสผ่าน 6 ตัวอักษร' })
  }

  if (errors.length > 0) {
    res.render('log/logintab', {
      errors,
      name,
      email,
      password,
      password2,
      i18n: res
    })
  } else {
    try {
      // const user = await schema.validateAsync(req_data)
      const hash = await bcrypt.hashSync(password, 10)
      const uuid4 = await uuid.v4()
      const data = {
        id: uuid4,
        username: name,
        email: email,
        password: hash,
        date: new Date()

      }
      const citiesRef = db.collection('users')
      const snapshot = await citiesRef.where('email', '==', data.email).get()
      if (snapshot.empty) {
        db.collection('users').doc(uuid4).set(data)
        req.flash(
          'success_msg',
          'ลงทะเบียนเรียบร้อย'
        )
        res.redirect('/users/login')
        return
      } else {
        req.flash(
          'success_msg',
          'อีเมลนี้ลงทะเบียนแล้ว'
        )
        res.redirect('/users/login')
      }
    } catch (err) {
      req.flash(
        'success_msg',
        'การลงทะเบียนผิดพลาด'
      )
    }
  }
})

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next)
})

// Logout
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', 'You are logged out')
  res.redirect('/users/login')
})

module.exports = router
