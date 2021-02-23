// import idb from './js/IDB.js'
// import { getMyUser } from './js/myuser.js'
// import { createIndexDb } from './js/localdb.js'

if (!window.indexedDB) {
  window.indexedDB = window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
}
// prefixes of window.IDB objects
window.IDBTransaction = window.IDBTransaction ||
    window.webkitIDBTransaction || window.msIDBTransaction
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange ||
    window.msIDBKeyRange

if (!window.indexedDB) {
  window.alert("Your browser doesn't support a stable version of IndexedDB.")
}

try {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js', {
      scope: '/'
    })
      .then(registration => {
        console.log('SW Registered!')
      })
      .catch(error => {
        console.log('SW Registeration Fail')
        console.log(error)
      })
  }
} catch (e) {

}
document.addEventListener('DOMContentLoaded', async (event) => {
  await import('./js/localdb.js').then((app) => {
    app.createIndexDb('users')
  }).catch(e => console.log(e))
  // await import('./js/myuser.js').then((appa) => appa.getMyUser()).catch(e => console.log(e))
  // await import('./js/push.js').then((appa) => appa.pushmessage()).catch(e => console.log(e))
})
