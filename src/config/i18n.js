
module.exports = function (i18n) {
  i18n.configure({
    locales: ['en', 'th'],
    // eslint-disable-next-line node/no-path-concat
    directory: __dirname + '/locales',
    defaultLocale: 'en'
  })
}
