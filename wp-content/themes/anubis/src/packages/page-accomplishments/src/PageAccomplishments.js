import { html, css, LitElement } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { stylesBase, stylesAnimations } from '../../me-app/src/styles.js';

export class PageAccomplishments extends LitElement {
  static get styles() {
    return [
      stylesBase,
      stylesAnimations,
      css`
        ul {
          margin: 0 10%;
          font-size: 1.5rem;
        }

        li {
          margin-bottom: 2rem;
        }
      `
    ]
  }

  static get properties() {
    return {
      accomplishments: { type: String }
    }
  }

  render() {
    return html`
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
