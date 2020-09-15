import { html, css, LitElement } from 'lit-element';
import { stylesBase, stylesAnimations } from '../../me-app/src/styles.js';
import { stylesPaginator } from './stylesPaginator.js';
import '../../me-figure/me-figure.js';

export class PageWebsites extends LitElement {
  static get styles() {
    return [
      stylesBase,
      stylesAnimations,
      stylesPaginator,
      css`
        section {
          text-align: center;
        }
      `
    ]
  }

  static get properties() {
    return {
      websiteData: { type: Object },
      pageIndex: { type: Number },
      xDown: { type: Number },
      yDown: { type: Number },
    }
  }

  constructor() {
    super();
    this.websiteData = {};
    this.pageIndex = 1;
    this.xDown = null;
    this.yDown = null;
  }

  render() {
    return html`
      <h3>Websites</h3>
      <section class="page">
        <section class="pagenator">
          <div class="pagenator__container">
            ${this.listWebsites()}
          </div>
          <div class="pagenator__paginator"></div>
        </section>
      </section>
    `
  }

  firstUpdated() {
    this.fetchWebsites();
  }

  updated() {
    this.initPagenator();
  }

  listWebsites() {
    let pages;
    let hero;

    if (this.websiteData.length > 0) {
      pages = this.websiteData.map((website) => {
        hero = website._embedded['wp:featuredmedia'][0].source_url;

        return html `
          <div class="pagenator__page">
            <me-figure
              title=${website.title.rendered}
              desc="${website.content.rendered}"
              bgimage="${hero}"
              sitelink="${website.acf.site_link}">
            </me-figure>
          </div>
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

  initPagenator() {
    const pages = this.shadowRoot.querySelectorAll('.pagenator__page');
    const pagenator = this.shadowRoot.querySelector('.pagenator');

    pagenator.addEventListener('touchstart', (event) => {this.handleTouchStart(event)}, false);
    pagenator.addEventListener('touchmove', (event) => {this.handleTouchMove(event)}, false);

    this.createPagination();
    if (pages.length > 0) this.showSlide(this.pageIndex);
  }

  createPagination() {
    let markup = "";
    const slides = this.shadowRoot.querySelectorAll('.pagenator__page');
    const paginator = this.shadowRoot.querySelector('.pagenator__paginator');

    slides.forEach((slide, index) => {
      const page = index + 1;
      markup += `<a class="pagenator__navitem"><span>${page}</span></a>`;
    });

    paginator.innerHTML = markup;

    this.shadowRoot.querySelectorAll('.pagenator__navitem').forEach((navitem, index) => {
      navitem.addEventListener('click', () => {
        this.showSlide(index + 1);
      })
    });

  }

  showSlide(slideNumber) {
    const navitems = this.shadowRoot.querySelectorAll('.pagenator__navitem');
    const slides = this.shadowRoot.querySelectorAll('.pagenator__page');

    this.pageIndex = slideNumber;

    // if the slide number is more than the maximum slides go to 1
    if (slideNumber > slides.length) this.pageIndex = 1;

    // go to the end if the slide number is less than 1
    if (slideNumber < 1) this.pageIndex = slides.length;

    // hide all of the slides
    slides.forEach((slide) => {
      const theSlide = slide;
      theSlide.style.display = "none";
    });

    // remove active from each paginator item
    navitems.forEach((navitem) => {
      navitem.classList.remove('pagenator__navitem--active');
    });

    // make the right slide and navitem active
    slides[this.pageIndex-1].style.display = 'block';
    navitems[this.pageIndex-1].classList.add('pagenator__navitem--active');
  }

  handleTouchStart(event) {
    this.xDown = event.touches[0].clientX;
    this.yDown = event.touches[0].clientY;
  }

  handleTouchMove(event) {
    if ( !this.xDown || !this.yDown ) {
        return;
    }

    const xUp = event.touches[0].clientX;
    const yUp = event.touches[0].clientY;
    const xDiff = this.xDown - xUp;
    const yDiff = this.yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
        if ( xDiff > 0 ) {
           this.showSlide(this.pageIndex + 1);
        } else {
            this.showSlide(this.pageIndex - 1);
        }
    } else {
        // eslint-disable-next-line no-lonely-if
        if ( yDiff > 0 ) {
            /* up swipe */
        } else {
            /* down swipe */
        }
    }
    /* reset values */
    this.xDown = null;
    this.yDown = null;
  };
}
