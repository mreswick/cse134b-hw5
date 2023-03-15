class ButtonCount extends HTMLElement {
  constructor() {
    super();
    //attach shadow DOM
    this.attachShadow({mode: 'open' });

    //make not selectable (set this attribute)
    //so that text doesn't highlight when clicked
    //this.unselectable =  "on";

    //counter
    this.count = 0;
    let display = `Times Clicked: ${this.count}`;
    this.shadowRoot.innerHTML = `<button>${display}</button>`;
    this.addEventListener('click', () => {
      this.count += 1;
      display = `Times Clicked: ${this.count}`;
      this.shadowRoot.innerHTML = `<button>${display}</button>`;
    });
  }
}
window.customElements.define('button-count', ButtonCount);
