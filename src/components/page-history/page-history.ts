import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { stylesBase, stylesAnimations } from '../../assets/styles';
import { workHistory } from '../../shared/content';

@customElement('page-history')
export class PageHistory extends LitElement {
  static styles = [
    stylesBase,
    stylesAnimations,
    css`
      section {
          text-align: center;
      }

      p {
        margin: 0.5rem 0;
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

      .page {
        padding-bottom: 7rem;
      }
    `
  ];

  render() {
    return html`
      <h3>History</h3>
      <section class="page">
        <ul>
          ${this.makeHistory()}
        </ul>
      </section>
    `
  }

  makeHistory() {
    return workHistory.map(job => {
      return html`
        <li>
          <p>${job.date}</p>
          <p><strong>${job.description}</strong></p>
        </li>
      `;
    });
  }
}
