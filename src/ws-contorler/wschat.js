
const users = []
function sendUsers (method, parames) {
  Object.keys(users).forEach(key => {
    try {
      send(users[key].ws, { method: method, parames: parames })
    } catch (error) {
      delete users[key]
      console.log(key + ': error tosend [deleted]')
    }
  })
}
const send = (ws, data) => {
  const d = JSON.stringify({
    jsonrpc: '2.0',
    ...data
  })
  ws.send(d)
}
module.exports = (ws, res) => {
  ws.on('message', (msg) => {
    const data = JSON.parse(msg)

    switch (data.method) {
      case 'login':
        // eslint-disable-next-line no-case-declarations
        const { id, username, email } = data.params
        users[id] = {
          user: { id, username, email },
          ws: ws
        }
        // eslint-disable-next-line no-case-declarations
        const payload = {
          id: id,
          username: username,
          msg: `[server] ${username}- login`
        }
        sendUsers('login', payload)
        // send(ws, { method: 'msg', parames: { msg: '[server] connecting...' } })
        break
    }
  })
  ws.on('close', () => {
    // allusers()
    console.log('some client is closing..')
  })
  // ws.send('[server] connecting...')
}
