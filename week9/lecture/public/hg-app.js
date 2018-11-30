function html(strings, ...exprs) {
  return strings.map((str, index) => `${str}${exprs[index] ? exprs[index] : ''}`);
}

(function () {
  const template = document.createElement('template');
  template.innerHTML = html`
  <div id="app">
    <button id="get-data-btn">subscribe</button>
  </div>
  `;

  class App extends HTMLElement {

    constructor() {
      super();
      const subscribe = () => {
        this.isSubscribed = true;
        fetch('/api/subscribe').then(res => res.json()).then(data => {
          console.log(data);
          subscribe();
        });
      }
      const socket = io('http://localhost:8080', { transports: ['websocket'], upgrade: false });
      socket.on('event', () => {
        console.log('Event happened');
        socket.emit('something-happened', { data: [1, 2, 3] });
      });

      this.isSubscribed = false;
      const root = this.root = this.attachShadow({ mode: 'open' });
      this.root.appendChild(template.content.cloneNode(true));
      this.root.getElementById('get-data-btn').addEventListener('click', () => {
        if (this.isSubscribed) { return; }
        // var xhttp = new XMLHttpRequest();
        // xhttp.onreadystatechange = function () {
        //   if (this.readyState == 4 && this.status == 200) {
        //     const result = JSON.parse(xhttp.responseText);
        //     result.forEach(item => {
        //       const el = document.createElement('div');
        //       el.innerHTML = item.user;
        //       root.appendChild(el);
        //     });
        //   }
        // };
        // xhttp.open('GET', '/api/data', true);
        // xhttp.send();
        fetch('/api/data').then(res => res.json()).then(data => {
          console.log(data);
          subscribe();
        });
      });
    }

    _applyUpdates(updates) {
      updates.forEach(update => {
        const elements = this.root.querySelector(update.selector);
        elements.forEach(el => el.innerHTML = update.value);
      });
    }
  }

  customElements.define('hg-app', App);
}());