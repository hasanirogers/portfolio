import { html, css, LitElement } from 'lit';
import { router } from '../../me-app/src/MeApp.js';
import { stylesBase } from '../../me-app/src/styles.js';

export class MeProject extends LitElement {
  static get styles() {
    return [
      stylesBase,
      css`
        :host {
          opacity: 0;
        }

        img {
          width: 100%;
          height: 100%;
        }

        a {
          display: flex;
          height: 100%;
          padding: 0;
          transition: transform 300ms ease;
        }

        a:hover {
          transform: scale(1.1);
        }

        @media screen and (min-width: 769px) {
          :host([size="2x2"]) {
            grid-column: span 2;
            grid-row: span 2;
          }

          :host([size="2x1"]) {
            grid-column: span 2;
          }
        }
      `
    ]
  }

  static get properties() {
    return {
      size: {
        type: String
      },
      slug: {
        type: String
      },
      link: {
        type: String
      },
      half: {
        type: String,
      },
      thumb: {
        type: String,
      },
      heading: {
        type: String,
      },
      desktop: {
        type: Boolean
      }
    }
  }

  firstUpdated() {
    this.isDesktop();
    window.addEventListener('resize', () => this.isDesktop());
  }

  render() {
    return html`
      <a href="${router.urlForPath(`/project/${this.slug}`)}">
        ${this.makeImage()}
      </a>
    `
  }

  makeImage() {
    if (this.size === '2x1' && this.desktop) {
      return html`<img src="${this.half}" alt="${this.heading}" />`;
    }

    return html`<img src="${this.thumb}" alt="${this.heading}" />`;
  }

  isDesktop() {
    const mediaQuery = matchMedia('(min-width: 769px)');
    this.desktop = mediaQuery.matches;
  }
}
