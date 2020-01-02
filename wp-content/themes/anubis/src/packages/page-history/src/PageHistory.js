import { html, css, LitElement } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { stylesBase, stylesAnimations } from '../../me-app/src/styles.js';

export class PageHistory extends LitElement {
  static get styles() {
    return [
      stylesBase,
      stylesAnimations,
      css`
        section {
            text-align: center;
        }

        ul {
          display: grid;
          margin-top: 2rem;
          padding: 0 1rem;
          list-style: none;
          grid-template-columns: 1fr;
        }

        @media only screen and (min-width: 640px) {
          ul {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media only screen and (min-width: 1280px) {
          ul {
            grid-template-columns: 1fr 1fr 1fr 1fr;
          }
        }

        li {
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin: 1rem;
          padding: 1rem;
          border-radius: 1rem/2rem;
          border: 4px solid rgba(255, 255, 255, 0.25);
        }

        strong {
          font-size: 1.25rem;
        }
      `
    ]
  }

  static get properties() {
    return {
      history: { type: Array }
    }
  }

  constructor() {
    super();
    this.history = [];
  }

  firstUpdated() {
    this.fetchWorkHistory();
  }

  render() {
    return html`
      <h3>History</h3>
      <section class="page">
        <ul>${this.displayWorkHistory()}</ul>
      </section>
    `
  }

  displayWorkHistory() {
    let workhistory;

    if (this.history.length > 0) {
      workhistory = this.history.map(job => {
        return html `<li>${unsafeHTML(job.content.rendered)}</li>`;
      });
    } else {
      workhistory = 'Looks like you don\'t have a work history yet.';
    }

    return workhistory;
  }

  async fetchWorkHistory() {
    const workhistory = await fetch('/?rest_route=/wp/v2/work_history')
      .then(response => response.text())
      .then(text => {
        try {
          return JSON.parse(text);
        } catch(error) {
          console.log(error);
        }
      });

    this.history = workhistory;
  }
}
