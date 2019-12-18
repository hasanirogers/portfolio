import { html, LitElement } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

export class PageAccomplishments extends LitElement {
  static get properties() {
    return {
      accomplishments: { type: String }
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
        ${unsafeHTML(this.accomplishments)}
      </section>
    `
  }

  firstUpdated() {
    this.fetchAccomplishments();
  }

  async fetchAccomplishments() {
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
      this.accomplishments = accomplishments[0].content.rendered;
    } else {
      this.accomplishments = 'Uh oh. There was a problem grabbing my accomplishments.';
    }
  }
}
