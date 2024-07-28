import { html, css, LitElement } from 'lit';
import { router } from '../me-app/me-app';
import { stylesBase } from '../../assets/styles';
import { customElement, property } from 'lit/decorators.js';

@customElement('me-project')
export class MeProject extends LitElement {
  static get styles() {
    return [
      stylesBase,
      css`
        :host {
          opacity: 0;
          border: 2px solid white;
        }

        :host([gray]) {
          opacity: 0.05 !important;
          filter: grayscale(1);
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

  @property()
  size: string = '';

  @property()
  slug: string = '';

  @property()
  link: string = '';

  @property()
  half: string = '';

  @property()
  thumb: string = '';

  @property()
  heading: string = '';

  @property()
  desktop: boolean = false;

  @property()
  skills: string[] = [];

  @property({ type: Boolean, reflect: true })
  gray: boolean = false;

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
