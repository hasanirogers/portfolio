import { html } from '@polymer/lit-element';
import { PageViewElement } from '../helpers/page-view-element.js';

class ViewEducation extends PageViewElement {
  static get properties() {
    return {
      _educationMarkup: {
        type: String
      }
    }
  }

  constructor() {
    super();
    this._educationMarkup = 'Looks like you have no education yet.';
  }

  firstUpdated() {
    this._fetchEducation();
  }

  render() {
    let page = this.shadowRoot.querySelector('.page');

    if (page) page.innerHTML = this._educationMarkup;

    return html`
      <link rel="stylesheet" href="/wp-content/themes/anubis/bundles/bundle.css">
      <style>
        section {
          text-align: center;
          font-size: 2rem;
        }
      </style>
      <h3>Education</h3>
      <section class="page"></section>
    `
  }

  async _fetchEducation() {
    const education = await fetch('/?rest_route=/wp/v2/pages&slug=education')
      .then(response => response.text())
      .then(text => {
        try {
          return JSON.parse(text);
        } catch(error) {
          console.log(error);
        }
      });

    if (education.length > 0) {
      this._educationMarkup = education[0].content.rendered;
    } else {
      this._educationMarkup = 'Uh oh. There was a problem grabbing my education.'
    }
  }
}

window.customElements.define('view-education', ViewEducation);
