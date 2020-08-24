import { LitElement, html, css } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { stylesBase, stylesAnimations } from '../../me-app/src/styles';

export class MeFigure extends LitElement {
  static get styles() {
    return [
      stylesBase,
      stylesAnimations,
      css`
        :host {
          perspective: 1700px;
	        perspective-origin: 0 50%;
        }

        a {
          background: transparent;
        }

        h3 {
          color: #fff;
          position: static;
          padding: 0;
          margin: 2rem 0 0;
        }

        img {
          max-width: 100%;
          display: block;
          position: relative;
        }

        figure {
          overflow: hidden;
          margin: 0;
          position: relative;

          transform-style: preserve-3d;
        }

        figcaption {
          color: #ffffff;

          height: 100%;
          width: 100%;
          opacity: 0;

          position: absolute;
          top: 0;
          left: 0;

          background: rgba(0,0,0,0.75);
          backface-visibility: hidden;
          transform-origin: 0 0;
          transform: rotateY(-90deg);
          transition: transform 0.4s, opacity 0.1s 0.3s;
        }

        figcaption div p {
          line-height: 1.5;
          padding: 1rem;
          text-align: justify;
          text-shadow: 1px 1px 0 #000;
        }

        :host([opened]) figcaption {
          opacity: 1;
          transform: rotateY(0deg);
          transition: transform 0.4s, opacity 0.1s;
        }

        .round-btn {
          position: absolute;
          bottom: 0;
          right: 0;
        }

        @media screen and (min-width: 768px) {
          figure {
            border-radius: 4rem;
          }

          figcaption {
            width: 50%;
          }

          figcaption div p {
            padding: 0 2rem;
          }

          img {
            max-height: 80vh;
          }
        }

        @media screen and (max-width: 768px) {
          figcaption div p {
            /* line clamp */
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            /* autoprefixer: off */
            -webkit-box-orient: vertical;
            /* autoprefixer: on */
          }
        }

        @media screen and (min-width: 1440px) {
          img {
            max-height: 90vh;
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

  constructor() {
    super();
    this.opened = false;
  }

  render() {
    return html `
      <figure
        @click="${() => {this.toggleOpen();}}"
        @mouseover="${() => {this.open();}}"
        @mouseout="${() => {this.close();}}">
        <img src="${this.bgimage}">
        <figcaption>
          <h3>${this.title}</h3>
          <div>${unsafeHTML(this.desc)}</div>
          <a class="round-btn" target="_blank" href="${this.sitelink}">Visit Site</a>
        </figcaption>
      </figure>
    `
  }

  open() {
    this.opened = true;
  }

  close() {
    this.opened = false;
  }

  toggleOpen() {
    this.opened = !this.opened;
  }
}
