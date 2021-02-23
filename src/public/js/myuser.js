import { editstyle } from './style/eidtstyle.js'
import { profilestyle } from './style/profile.js'
class myuser extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  get user () {
    return this.getAttribute('user')
  }

  get head () {
    return this.getAttribute('head')
  }

  set user (val) {
    this.setAttribute('user', val)
  }

  set head (val) {
    this.setAttribute('head', val)
  }

  static get observedAttributes () {
    return ['user', 'head']
  }

  attributeChangedCallback (prop, oldVal, newVal) {
    if (prop === 'user') {
      this.render()
    }
  }

  connectedCallback () {
    this.render()
    // const btnedit = this.shadow.getElementById('tbnedit')
    // btnedit.addEventListener('click', this.edit.bind(this))
  }

  edit () {
    // eslint-disable-next-line no-unused-vars
    const { id, username, email } = JSON.parse(this.user)
    // eslint-disable-next-line no-unused-vars
    const { id: hid, username: huser, email: hemail, update, confirm, password, cancle } = JSON.parse(this.head)

    this.shadow.innerHTML = editstyle + `
    <form action="/action_page.php" method="post">
    <div class="imgcontainer">
      <img src="../images/img_avatar.png" alt="Avatar" class="avatar">
    </div>
    <div class="container">
      <label for="uname"><b>${huser}</b></label>
      <input type="text" placeholder="${huser}" value="${username}" name="uname" required>
      <label for="eemail"><b>${hemail}</b></label>
      <input type="text" placeholder="${hemail}" value="${email}" name="eemil" required>
      <label for="psw"><b>${password}</b></label>
      <input type="password" placeholder="${confirm}${password}" name="psw" required>
      <button type="submit">${update}</button>
    </div>
    <div class="container" style="background-color:#f1f1f1">
      <a href="/profile"><span class="cancelbtn">${cancle}</span></a>
    </div>
  </form>
    `
  }

  render () {
    const { id, username, email } = JSON.parse(this.user)
    const { id: hid, username: huser, email: hemail, welcome, edit } = JSON.parse(this.head)

    this.shadow.innerHTML = profilestyle + `
    <div class="card">
    <img src="../images/img_avatar.png" alt="Avatar" style="width:100%">
    <div class="container">
    <h4><b>${welcome}${username}</b></h4>
    <p class="card-text">${hid}: ${id}</p>
    <p class="card-text">${huser}: ${username}</p>
    <p class="card-text">${hemail}: ${email}</p>
    <button id="tbnedit" class="btn success">${edit}</button>
  </div>
  </div>
   `
  }
}
export function getMyUser () {
  customElements.define('my-user', myuser)
}
