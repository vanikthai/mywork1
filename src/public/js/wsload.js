// import { insertIndexDb } from '../js/localdb.js'
export function locate () {
  let col = ''
  if (location.host === 'localhost:3000') {
    col = `ws://${location.host}/chat`
  } else {
    col = `wss://${location.host}/chat`
  }
  return col
}
export function startWs () {
  // eslint-disable-next-line no-const-assign
  const theuser = document.getElementById('userset').dataset.user
  const bottonmsg = document.getElementById('bottonmsg')
  const { id, username, email } = JSON.parse(theuser)
  const ws = new WebSocket(locate())
  window.send = (data) => {
    ws.send(JSON.stringify(data))
  }

  ws.onopen = () => {
    bottonmsg.innerHTML = '[client] ws: to connecting..'
    const payload = {
      id: id,
      username: username,
      email: email
    }
    // eslint-disable-next-line no-undef
    send({ method: 'login', params: payload })
  }

  ws.onmessage = (e) => {
    const res = JSON.parse(e.data)
    //  const { msg } = res.parames
    switch (res.method) {
      case 'login':
        // console.log(res.parames)
        // eslint-disable-next-line no-case-declarations
        const payload = {
          id: res.parames.id,
          username: res.parames.username
        }
        console.log('[server]' + username)
        // eslint-disable-next-line no-case-declarations
        const noitfi = () => new Notification('welcome', {
          body: res.parames.msg,
          icon: '../images/icon-128x128.png'
        })
        import('../js/localdb.js').then((app) => app.insertIndexDb('users', payload))
        bottonmsg.innerHTML = res.parames.msg
        noitfi()
        break
    }
  }

  ws.onclose = async () => {
    bottonmsg.innerHTML = '[client] ws: is closed.'
  }
}
