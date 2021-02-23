
const PUBLICKEY = 'BDnTbdCRxAwa-lN1wf0AnqOrfmxEgIApu9qsu1teF6zAH0_2rJMxzRJ3VEeLhVF-LQ_Yy9Ro9suj6WhUf5vEr_4'

function urlBase64ToUint8Array (base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export async function pushmessage (msg) {
  const register = await navigator.serviceWorker.register('/worker.js', {
    scope: '/'
  })
  const newPublicKey = await urlBase64ToUint8Array(PUBLICKEY)
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: newPublicKey
  })
  const paload = {
    msg: msg,
    pushSubdiscription: subscription
  }
  await fetch('/subscription', {
    method: 'POST',
    body: JSON.stringify(paload),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
