import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('me-hamburger')
export class MeHamburger extends LitElement {
  static styles = [
      css`
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
      `
  ];

  static get properties() {
    return {
      transform: { type: Boolean, reflect: true }
    }
  }

  @property({ reflect: true})
  transform: boolean = false;

  render() {
    return html `
      <div class="burger"></div>
    `
  }

  transformIcon() {
    this.transform = !this.transform;
  }
}
