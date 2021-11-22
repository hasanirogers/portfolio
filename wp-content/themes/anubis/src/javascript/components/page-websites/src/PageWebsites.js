import { html, css, LitElement } from 'lit';
import { stylesBase, stylesAnimations } from '../../me-app/src/styles.js';
import Glide from '@glidejs/glide';
import '../../me-figure/me-figure.js';

export class PageWebsites extends LitElement {
  static get styles() {
    return [
      stylesBase,
      // stylesAnimations,
      // stylesPaginator,
      css`
        :host {
          --arrow-offset: -2.5rem;
        }

        button {
          cursor: pointer;
          border: 0;
          position: absolute;
          top: 50%;
          opacity: 0.5;
          background: none;
          transform: translateY(-50%) scale(0.75);
          transition: opacity 0.3s ease;
        }

        button:hover {
          opacity: 1;
        }

        .glide {
          width: 80vw;
          height: auto;
          max-height: 50vh;
          margin: auto;
        }

        .back {
          left: var(--arrow-offset);
        }

        .forward {
          right: var(--arrow-offset);
        }

        @media (min-width: 768px) {
          :host {
            --arrow-offset: -6rem;
          }

          button {
            transform: translateY(-50%) scale(1);
          }
        }
      `
    ]
  }

  static get properties() {
    return {
      websiteData: { type: Object },
    }
  }

  constructor() {
    super();
    this.websiteData = {};
    this.domain = window.location.origin;
  }

  render() {
    return html`
      <link rel="stylesheet" href="${this.domain}/wp-content/themes/anubis/bundles/frontend.css" />
      <h3>Websites</h3>
      <section class="page">
        <div class="glide">
          <div class="glide__track" data-glide-el="track">
            <ul class="glide__slides">
              ${this.listWebsites()}
            </ul>
          </div>
          <div data-glide-el="controls">
            <button class="back" data-glide-dir="<">
              <svg xmlns="http://www.w3.org/2000/svg" class="prev" width="56.898" height="91" viewBox="0 0 56.898 91"><path d="M45.5,0,91,56.9,48.452,24.068,0,56.9Z" transform="translate(0 91) rotate(-90)" fill="#fff"></path></svg>
            </button>
            <button class="forward" data-glide-dir=">">
              <svg xmlns="http://www.w3.org/2000/svg" width="56.898" height="91" viewBox="0 0 56.898 91"><path d="M45.5,0,91,56.9,48.452,24.068,0,56.9Z" transform="translate(56.898) rotate(90)" fill="#fff"></path></svg>
            </button>
          </div>
        </div>
      </section>
    `
  }

  firstUpdated() {
    this.fetchWebsites();
  }

  updated() {
    if (this.websiteData.length > 0) this.initGlide();
  }

  initGlide() {
    const glideElement = this.shadowRoot.querySelector('.glide');
    const glideOptions = {
      type: 'carousel',
      startAt: 0,
      perView: 1,
      gap: 100,
      breakpoints: {
        768: {
          perView: 1
        }
      }
    };

    this.glide = new Glide(glideElement, glideOptions).mount();
  }

  listWebsites() {
    let pages;
    let hero;

    if (this.websiteData.length > 0) {
      pages = this.websiteData.map((website) => {
        hero = website._embedded['wp:featuredmedia'][0].source_url;

        return html `
          <li class="glide__slide">
            <me-figure
              title=${website.title.rendered}
              desc="${website.content.rendered}"
              bgimage="${hero}"
              sitelink="${website.acf.site_link}">
            </me-figure>
          </li>
        `;
      });
    }

    return pages;
  }

  async fetchWebsites() {
    const websites = await fetch("/?rest_route=/wp/v2/websites&per_page=99&_embed")
      .then(response => response.text())
      .then(text => {
        try {
          return JSON.parse(text);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error);
          return null;
        }
      });

    this.websiteData = websites;
  }
}
