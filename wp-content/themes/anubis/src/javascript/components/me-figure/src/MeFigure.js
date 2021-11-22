import { LitElement, html, css } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { stylesBase, stylesAnimations } from '../../me-app/src/styles.js';

export class MeFigure extends LitElement {
  static get styles() {
    return [
      stylesBase,
      // stylesAnimations,
      css`
        :host {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 80%;
          margin: auto;
        }

        :host > div {
          width: 100%;
        }

        p {
          line-height: 1.5;
          text-align: justify;
        }

        h4 {
          font-size: 1.5rem;
        }

        img {
          max-width: 100%;
          margin-top: 2rem;
          border-radius: 1rem / 2rem;
        }

        .desc {
          display: none;
        }

        .round-btn {
          margin: 0;
        }

        @media (min-width: 768px) {
          :host {
            display: grid;
            gap: 4rem;
            width: 85%;
            grid-template-columns: 1fr 40%;
          }

          img {
            order: 1;
            margin-top: 0;
          }

          .desc {
            display: block;
          }

          .round-btn {
            margin: 2rem 0;
          }
        }
      `
    ]
  }

  static get properties() {
    return {
      opened: {
        type: Boolean,
        reflect: true,
      },
      bgimage: {
        type: String,
      },
      title: {
        type: String
      },
      desc: {
        type: String
      },
      sitelink: {
        type: String
      }
    }
  }

  render() {
    return html `
      <img src="${this.bgimage}">
      <div>
        <h4>${this.title}</h4>
        <div class="desc">${unsafeHTML(this.desc)}</div>
        ${this.makeLink()}
      </div>
    `
  }

  makeLink() {
    if (this.sitelink) {
      return html`
        <a class="round-btn" target="_blank" href="${this.sitelink}">Visit Site</a>
      `;
    }

    return null;
  }
}
