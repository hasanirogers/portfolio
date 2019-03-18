import { html } from '@polymer/lit-element';
import { PageViewElement } from '../helpers/page-view-element.js';


class ViewWebsites extends PageViewElement {
  render() {
    return html`
      <style>
        section {
            text-align: center;
        }
      </style>
      <section>
        <h2>Websites</h2>
      </section>
    `
  }
}

window.customElements.define('view-websites', ViewWebsites);
