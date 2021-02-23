const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      const db = require('./firebase')
      const citiesRef = db.collection('users')
      // const snapshot = citiesRef.where('email', '==', email).get()
      citiesRef.where('email', '==', email).get()
        .then(data => {
          if (data.empty) {
            return done(null, false, { message: 'อีเมลยังไม่ได้ลงทะเบียน' })
          }
          data.forEach(doc => {
            const match = bcrypt.compareSync(password, doc.data().password)
            if (match) {
              done(null, {
                name: {
                  id: doc.data().id,
                  username: doc.data().username,
                  email: doc.data().email
                }
              })
            } else {
              return done(null, false, { message: 'รหัสผ่านไม่ถูกต้อง' })
            }
          })
        })
        .catch(e => {
          return done(null, null)
        })
    })
  )

  passport.serializeUser(function (user, done) {
    done(null, user.name)
  })

  passport.deserializeUser(function (id, done) {
    done(null, {
      name: id
    })
  })
}
