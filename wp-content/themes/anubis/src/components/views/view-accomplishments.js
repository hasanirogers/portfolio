import { html } from '@polymer/lit-element';
import { PageViewElement } from '../helpers/page-view-element.js';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';


class ViewAccomplishments extends PageViewElement {
  static get properties() {
    return {
      _accomplishmentsMarkup: {
        type: String
      }
    }
  }

  render() {
    return html`
      <link rel="stylesheet" href="/wp-content/themes/anubis/bundles/bundle.css">
      <style>
        ul {
          margin: 0 10%;
          font-size: 1.5rem;
        }

        li {
          margin-bottom: 2rem;
        }
      </style>
      <h3>Accomplishments</h3>
      <section class="page">
        ${unsafeHTML(this._accomplishmentsMarkup)}
      </section>
    `
  }

  firstUpdated() {
    this._fetchAccomplishments();
  }

  async _fetchAccomplishments() {
    const accomplishments = await fetch('/?rest_route=/wp/v2/pages&slug=accomplishments')
      .then(response => response.text())
      .then(text => {
        try {
          return JSON.parse(text);
        } catch(error) {
          console.log(error);
        }
      });

    if (accomplishments.length > 0) {
      this._accomplishmentsMarkup = accomplishments[0].content.rendered;
    } else {
      this._accomplishmentsMarkup = 'Uh oh. There was a problem grabbing my accomplishments.'
    }
  }
}

window.customElements.define('view-accomplishments', ViewAccomplishments);
