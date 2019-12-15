import { LitElement, html } from 'lit-element';

class MeHamburger extends LitElement {
  static get properties() {
    return {
      transform: {
        type: Boolean,
        reflect: true
      }
    }
  }

  constructor() {
    super();
    this.transform = false;
  }

  render() {
    return html `
      <style>
        :host {
          cursor: pointer;

          display: block;
          height: 30px;
          width: 30px;
        }

        .burger,
        .burger::after,
        .burger::before {
          width: 30px;
          height: 5px;
          position: absolute;
          left: 0px;
          z-index: 1;
          background: #e5c116;
          transition: all 200ms ease;
        }

        .burger {
          top: 10px;
        }

        .burger::before {
          content: " ";
          top: -10px;
        }

        .burger::after {
          content: " ";
          top: 10px;
        }

        :host([transform]) .burger::before {
          top: -8px;
          width: 20px;
          transform: rotate(-405deg);
        }

        :host([transform]) .burger::after {
          top: 8px;
          width: 20px;
          transform: rotate(405deg);
        }
      </style>
      <div class="burger"></div>
    `
  }

  transformIcon() {
    this.transform = !this.transform;
  }
}

customElements.define('me-hamburger', MeHamburger)
