import { tablefind } from '../style/tablefind.js'
class datauser extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.body = ''
  }

  static get observedAttributes () {
    return ['users']
  }

  get users () {
    return this.getAttribute('users')
  }

  set users (val) {
    return this.setAttribute('users', val)
  }

  attributeChangedCallback (prop, oldVal, newVal) {
    if (prop === 'users') {
      this.render()
    }
  }

  myFunction () {
    // Declare variables
    console.log('myfuntion')
    const input = this.shadow.getElementById('myInput')
    const filter = input.value.toUpperCase()
    const table = this.shadow.getElementById('myTable')
    const tr = table.getElementsByTagName('tr')
    let td, i, txtValue

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName('td')[0]
      if (td) {
        txtValue = td.textContent || td.innerText
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = ''
        } else {
          tr[i].style.display = 'none'
        }
      }
    }
  }

  connectedCallback () {
    this.render()
    const btnedit = this.shadow.getElementById('myTable')
    btnedit.addEventListener('click', alert('me'))
  }

  render () {
    if (this.users) {
      const users = JSON.parse(this.users)
      // eslint-disable-next-line no-unused-vars
      for (const key in users) {
        this.body = this.body + `<tr><td> ${users.username}</td><td> ${users.id}</td></tr>`
      }
      this.shadow.innerHTML = tablefind + `
      <input type="text" id="myInput" placeholder="Search for names.." title="Type in a name">
      <table id="myTable">
      <tr class="header">
      <th style="width:60%;">Name</th>
      <th style="width:40%;">ID</th>
      </tr>
      ${this.body}
      </table>
      `
    }
  }
}

export function datausers () {
  customElements.define('data-users', datauser)
}
