class datauser extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
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

  connectedCallback () {
    this.render()
    // const btnedit = this.shadow.getElementById('tbnedit')
    // btnedit.addEventListener('click', this.edit.bind(this))
  }

  render () {
    this.shadow.innerHTML = 'start'
  }
}

export function datausers () {
  customElements.define('data-users', datauser)
}
