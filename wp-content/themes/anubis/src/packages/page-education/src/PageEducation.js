import { html, css, LitElement } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { stylesBase, stylesAnimations } from '../../me-app/src/styles.js';

export class PageEducation extends LitElement {
  static get styles() {
    return [
      stylesBase,
      stylesAnimations,
      css `
        section {
          text-align: center;
          font-size: 2rem;
        }
      `
    ]
  }

  static get properties() {
    return {
      education: { type: String }
    }
  }

  render() {
    return html`
      <h3>Education</h3>
      <section class="page">
        ${unsafeHTML(this.education)}
      </section>
    `
  }

  firstUpdated() {
    this.fetchEducation();
  }

  async fetchEducation() {
    const education = await fetch('/?rest_route=/wp/v2/pages&slug=education')
      .then(response => response.text())
      .then(text => {
        try {
          return JSON.parse(text);
        } catch(error) {
          // eslint-disable-next-line no-console
          console.error(error);
          return null;
        }
      });

    if (education.length > 0) {
      this.education = education[0].content.rendered;
    } else {
      this.education = 'Uh oh. There was a problem grabbing my education.'
    }
  }
}
