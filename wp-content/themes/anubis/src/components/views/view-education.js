import { html } from '@polymer/lit-element';
import { PageViewElement } from '../helpers/page-view-element.js';

import { StylesShared } from '../styles/shared.js';

class ViewEducation extends PageViewElement {
  static get properties() {
    return {
      _educationMarkup: {
        type: String
      }
    }
  }

  firstUpdated() {
    this._fetchEducation();
  }

  render() {
    const education = this._educationMarkup || 'Nothing yet';
    const educationElm = this.shadowRoot.querySelector('.education');

    if (educationElm) educationElm.innerHTML = education;

    return html`
      ${StylesShared}
      <style>
        section {
          text-align: center;
          font-size: 2rem;
        }
      </style>
      <h3>Education</h3>
      <section>
        <div class="education"></div>
      </section>
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

      this._educationMarkup = education[0].content.rendered;
  }
}

window.customElements.define('view-education', ViewEducation);
