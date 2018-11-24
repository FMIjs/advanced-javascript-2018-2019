function html(strings, ...exprs) {
  console.log(strings, exprs);
}

html`<div>
  <span>${44 + 33}</span>
  ${55 + 33}
</div>`;

(function () {
  const template = document.createElement('template');
  template.innerHTML = `
  <div id="container">
    <div id="value"></div>
    <button data-type="dec">-</button>
    <button data-type="inc">+</button>
  </div>
  `;

  class AppCounter extends HTMLElement {

    set counter(value) {
      this._counter = value;
      this._updateValue();
      this.dispatchEvent(new CustomEvent('counter-change', {
        detail: value
      }));
    }

    get counter() {
      return this._counter;
    }

    constructor() {
      super();
      this.root = this.attachShadow({ mode: 'open' });
      this.root.appendChild(template.content.cloneNode(true));
      this.counter = 0;

      this.root.addEventListener('click', ({ target }) => {
        const type = target.getAttribute('data-type');
        if (type === 'inc') {
          this.counter++;
        } else if (type === 'dec') {
          this.counter--;
        }
      });
    }

    _updateValue() {
      this.root.getElementById('value').innerHTML = this.counter;
    }

    connectedCallback() {
      console.log('Connected');
    }

    disconnectedCallback() {
      console.log('Disconnected');
    }

    static get observedAttributes() {
      return ['value'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'value') {
        this.counter = newValue;
      }
    }

  }

  customElements.define('app-counter', AppCounter);
}());