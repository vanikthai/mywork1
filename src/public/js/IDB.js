export default function idb () {
  this.database = []
  this.inMessage = ''
}
idb.prototype = {
  createdb: function (dbname) {
    console.log(dbname)
    const mydb = window.indexedDB.open(dbname)
    mydb.onerror = function (e) {
      this.inMessage = e.message
    }
    mydb.onsuccess = function (event) {
      this.database[dbname] = mydb.result
      this.inMessage = 'success: ' + this.database[dbname]
    }
    mydb.onupgradeneeded = function (event) {
      this.database[dbname] = mydb.result
      const store = this.database[dbname].createObjectStore(dbname, { keyPath: 'uid' })
      store.transaction.onconplete = function (event) {
        this.inMessage = `${dbname} store successfully complete.`
      }
      store.clear()
    }
  },
  deletedb: function (dbname) {
    const request = window.indexedDB.deleteDatabase(dbname)
    request.onsuccess = function (event) {
      this.inMessage = `${dbname} subcessfull deleted..`
    }
  },
  insertRec: function (dbname, payload) {
    if (this.database[dbname]) {
      const insertTran = this.database[dbname].transaction(dbname, 'readwrite')
      const store = insertTran.objectStore(dbname)
      const request = store.add(payload)
      request.onerror = function (event) {
        this.inMessage = 'Error during insert record: ' + payload.uid
        // updatet
        this.updateRec(dbname, payload)
      }
      request.onsuccess = function (event) {
        //  import('../js/push.js').then((appa) => appa.pushmessage(payload.username)).catch(e => console.log(e))
        this.inMessage = 'success add: ' + payload.uid
      }
    }
  },
  deleteRec: function (dbname, uid) {
    if (this.database[dbname]) {
      const insertTran = this.database[dbname].transaction(dbname, 'readwrite')
      const store = insertTran.objectStore(dbname)
      const request = store.delete(uid)
      request.onerror = function (event) {
        this.inMessage = 'Error to delete: ' + uid
      }
      request.onsuccess = function (event) {
        this.inMessage = 'success to deleted: ' + uid
      }
    }
  },
  updateRec: function (dbname, payload) {
    if (this.database[dbname]) {
      const insertTran = this.database[dbname].transaction(dbname, 'readwrite')
      const store = insertTran.objectStore(dbname)
      const request = store.put(payload)
      request.onerror = function (event) {
        this.inMessage = 'Error to update: ' + payload.uid
      }
      request.onsuccess = function (event) {
        this.inMessage = 'success update recode : ' + payload.uid
      }
    }
  },
  getAllRecode: function (dbname, tableid) {
    const table = document.getElementById(tableid)
    if (this.database[dbname]) {
      const insertTran = this.database[dbname].transaction(dbname, 'readonly')
      const store = insertTran.objectStore(dbname)
      const request = store.openCursor()
      request.onerror = function (event) {
      }
      request.onsuccess = function (event) {
        const curcer = event.target.result
        if (curcer) {
          const rowCount = table.rows.length
          const row = table.insertRow(rowCount)
          const cell1 = row.insertCell(0)
          const cell2 = row.insertCell(1)
          cell1.innerHTML = curcer.value.username
          cell2.innerHTML = curcer.value.uid
          curcer.continue()
        } else {
          this.inMessage = `end data ${dbname}`
        }
      }
    }
  }
}
