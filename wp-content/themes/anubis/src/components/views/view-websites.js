import { html } from '@polymer/lit-element';
import { PageViewElement } from '../helpers/page-view-element.js';


class ViewWebsites extends PageViewElement {
  static get properties() {
    return {
      _websiteData: { type: Object },
      _pageIndex: { type: Number },
      _xDown: { type: Number },
      _yDown: { type: Number },
    }
  }

  constructor() {
    super();
    this._websiteData = {};
    this._pageIndex = 1;
    this._xDown = null;
    this.yDown = null;
  }

  render() {
    let websites = this._websiteData;
    let pages;

    if (websites.length > 0) {
      pages = websites.map((website, index) => {
        const heroImg = website._embedded['wp:featuredmedia'][0].source_url;

        return html `
          <div class="pagenator__page">
            <img src="${heroImg}" />
          </div>
        `;
      });
    }

    return html`
      <link rel="stylesheet" href="/wp-content/themes/anubis/bundles/bundle.css">
      <style>
        section {
            text-align: center;
        }
      </style>
      <h3>Websites</h3>
      <section class="page">
        <section class="pagenator">
          <div class="pagenator__container">
            ${pages}
          </div>
          <div class="pagenator__paginator"></div>
        </section>
      </section>
    `
  }

  firstUpdated() {
    this._fetchWebsites();
  }

  updated() {
    this._initPagenator();
  }

  async _fetchWebsites() {
    const websites = await fetch("/?rest_route=/wp/v2/websites&per_page=99&_embed")
      .then(response => response.text())
      .then(text => {
        try {
          return JSON.parse(text);
        } catch (error) {
          console.log(error);
        }
      });

    this._websiteData = websites;

    // websites.map((website) => {
    //   console.log('da site', website._embedded['wp:featuredmedia'][0].source_url);
    // });
  }

  _initPagenator() {
    let pages = this.shadowRoot.querySelectorAll('.pagenator__page');
    let pagenator = this.shadowRoot.querySelector('.pagenator');

    pagenator.addEventListener('touchstart', (event) => {this._handleTouchStart(event)}, false);
    pagenator.addEventListener('touchmove', (event) => {this._handleTouchMove(event)}, false);

    this._createPagination();
    if (pages.length > 0) this._showSlide(this._pageIndex);
  }

  _createPagination() {
    let html = "";
    let slides = this.shadowRoot.querySelectorAll('.pagenator__page');
    let paginator = this.shadowRoot.querySelector('.pagenator__paginator');

    slides.forEach((slide, index) => {
      let page = index + 1;
      html += '<a class="pagenator__navitem"><span>'+ page +'</span></a>';
    });

    paginator.innerHTML = html;

    this.shadowRoot.querySelectorAll('.pagenator__navitem').forEach((navitem, index) => {
      navitem.addEventListener('click', () => {
        this._showSlide(index + 1);
      })
    });

  }

  _showSlide(slideNumber) {
    let navitems = this.shadowRoot.querySelectorAll('.pagenator__navitem');
    let slides = this.shadowRoot.querySelectorAll('.pagenator__page');

    this._pageIndex = slideNumber;

    // if the slide number is more than the maximum slides go to 1
    if (slideNumber > slides.length) this._pageIndex = 1;

    // go to the end if the slide number is less than 1
    if (slideNumber < 1) this._pageIndex = slides.length;

    // hide all of the slides
    slides.forEach((slide, index) => {
      slide.style.display = "none";
    });

    // remove acitve from each paginator item
    navitems.forEach((navitem, index) => {
      navitem.classList.remove('pagenator__navitem--active');
    });

    // make the right slide and navitem active
    slides[this._pageIndex-1].style.display = 'block';
    navitems[this._pageIndex-1].classList.add('pagenator__navitem--active');
  }

  _handleTouchStart(event) {
    this._xDown = event.touches[0].clientX;
    this._yDown = event.touches[0].clientY;
  }

  _handleTouchMove(event) {
    if ( !this._xDown || !this._yDown ) {
        return;
    }

    let xUp = event.touches[0].clientX;
    let yUp = event.touches[0].clientY;
    let xDiff = this._xDown - xUp;
    let yDiff = this._yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
        if ( xDiff > 0 ) {
           this._showSlide(this._pageIndex + 1);
        } else {
            this._showSlide(this._pageIndex - 1);
        }
    } else {
        if ( yDiff > 0 ) {
            /* up swipe */
        } else {
            /* down swipe */
        }
    }
    /* reset values */
    this._xDown = null;
    this._yDown = null;
};
}

window.customElements.define('view-websites', ViewWebsites);
