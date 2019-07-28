import { html } from '@polymer/lit-element';
import { PageViewElement } from '../helpers/page-view-element.js';


class ViewHistory extends PageViewElement {
  static get properties() {
    return {
      _workHistoryData: { type: Array }
    }
  }

  constructor() {
    super();
    this._workHistoryData = [];
  }

  firstUpdated() {
    this._fetchWorkHistory();
  }

  render() {
    let workhistory;

    if (this._workHistoryData.length > 0) {
      workhistory = this._workHistoryData.map(job => {
        let listItem = document.createElement("li");
        listItem.innerHTML = job.content.rendered;

        return listItem;
      });
    } else {
      workhistory = 'Looks like you don\'t have a work history yet.';
    }

    return html`
      <link rel="stylesheet" href="/wp-content/themes/anubis/bundles/bundle.css">
      <style>
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
      </style>
      <h3>History</h3>
      <section class="page">
        <ul>${workhistory}</ul>
      </section>
    `
  }

  async _fetchWorkHistory() {
    const workhistory = await fetch('/?rest_route=/wp/v2/work_history')
      .then(response => response.text())
      .then(text => {
        try {
          return JSON.parse(text);
        } catch(error) {
          console.log(error);
        }
      });

    this._workHistoryData = workhistory;
  }
}

window.customElements.define('view-history', ViewHistory);
