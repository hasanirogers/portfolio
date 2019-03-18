import { html } from '@polymer/lit-element';
import { PageViewElement } from '../helpers/page-view-element.js';


class ViewHistory extends PageViewElement {
  render() {
    return html`
      <link rel="stylesheet" href="/wp-content/themes/anubis/bundles/bundle.css">
      <style>
        section {
            text-align: center;
        }
      </style>
      <h3>History</h3>
      <section class="page">
        WIP
      </section>
    `
  }
}

window.customElements.define('view-history', ViewHistory);
