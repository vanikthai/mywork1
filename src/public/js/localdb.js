export const db = []

export function createIndexDb (dbname) {
  const request = window.indexedDB.open(dbname)

  request.onerror = function (event) {
    console.log('error: ')
  }
  request.onupgradeneeded = function (event) {
    db[dbname] = request.result
    const store = db[dbname].createObjectStore(dbname, { keyPath: 'id' })
    store.transaction.onconplete = function (event) {
      // console.log(`${dbname} store successfully complete.`)
    }
    store.clear()
  }
  request.onsuccess = function (event) {
    db[dbname] = request.result
    // console.log('success: ' + db[dbname])
  }
}

export function deleteIndexDb (dbname) {
  const request = window.indexedDB.deleteDatabase(dbname)
  request.onsuccess = function (event) {
    // console.log(`${dbname} subcessfull deleted..`)
  }
}

export function insertIndexDb (dbname, payload) {
  if (db[dbname]) {
    const insertTran = db[dbname].transaction(dbname, 'readwrite')
    const store = insertTran.objectStore(dbname)

    const request = store.add(payload)

    request.onerror = function (event) {
      // console.log('error add: ' + payload.id)
      updatetIndexDb(dbname, payload)
    }
    request.onsuccess = function (event) {
      import('../js/push.js').then((appa) => appa.pushmessage(payload.username)).catch(e => console.log(e))
    // console.log('success add: ' + payload.id)
    }
  }
}

export function gettIndexDb (dbname, payload) {
  if (db[dbname]) {
    const insertTran = db[dbname].transaction(dbname, 'readonly')
    const store = insertTran.objectStore(dbname)
    const request = store.get(payload)
    request.onerror = function (event) {
      // console.log('error to get: ' + payload)
    }
    request.onsuccess = function (event) {
      // console.log('success: ' + event.target.result)
    }
  }
}

export function showalltIndexDb (dbname) {
  const table = document.getElementById('myTable')

  if (db[dbname]) {
    const insertTran = db[dbname].transaction(dbname, 'readonly')
    const store = insertTran.objectStore(dbname)
    const request = store.openCursor()
    request.onerror = function (event) {
    }
    request.onsuccess = function (event) {
      const curcer = event.target.result
      if (curcer) {
        // Create an empty <tr> element and add it to the 1st position of the table:
        const rowCount = table.rows.length
        const row = table.insertRow(rowCount)

        // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
        const cell1 = row.insertCell(0)
        const cell2 = row.insertCell(1)

        // Add some text to the new cells:
        cell1.innerHTML = curcer.value.username
        cell2.innerHTML = curcer.value.id
        //  toshow.setAttribute('users', JSON.stringify(curcer.value))
        curcer.continue()
      } else {
        console.log(`end data ${dbname}`)
      }
    }
  }
}

export function sendMessage (dbname) {
  if (db[dbname]) {
    const insertTran = db[dbname].transaction(dbname, 'readonly')
    const store = insertTran.objectStore(dbname)
    const request = store.openCursor()
    request.onerror = function (event) {
      // console.log('error to send: ' + dbname)
    }
    request.onsuccess = function (event) {
      const curcer = event.target.result
      if (curcer) {
        // eslint-disable-next-line no-undef
        if (curcer.key !== curentUser.id) {
          // eslint-disable-next-line no-undef
          send({ method: 'message', params: curcer.value })
        }
        curcer.continue()
      }
    }
  }
}

export function updatetIndexDb (dbname, payload) {
  if (db[dbname]) {
    const insertTran = db[dbname].transaction(dbname, 'readwrite')
    const store = insertTran.objectStore(dbname)
    const request = store.put(payload)
    request.onerror = function (event) {
      // console.log('error to update: ' + payload.id)
    }
    request.onsuccess = function (event) {
      // console.log('success: ' + payload.id)
    }
  }
}

export function deleterecIndexDb (dbname, id) {
  // console.log(dbname + ' ' + id)
  if (db[dbname]) {
    const insertTran = db[dbname].transaction(dbname, 'readwrite')
    const store = insertTran.objectStore(dbname)
    const request = store.delete(id)
    request.onerror = function (event) {
      // console.log('error to delete: ' + id)
    }
    request.onsuccess = function (event) {
      // console.log('success: ' + id)
    }
  }
}

export function clearTableIndexDb (dbname) {
  const toshow = document.getElementById(dbname)
  toshow.innerHTML = ''
  if (db[dbname]) {
    const insertTran = db[dbname].transaction(dbname, 'readwrite')
    const store = insertTran.objectStore(dbname)
    const request = store.clear()
    request.onerror = function (event) {
      console.log('error to clear Table: ' + dbname)
    }
    request.onsuccess = function (event) {
      console.log('success clear table: ' + dbname)
    }
  }
}
