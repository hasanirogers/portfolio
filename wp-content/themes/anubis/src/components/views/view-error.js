import { html } from '@polymer/lit-element';
import { PageViewElement } from '../helpers/page-view-element.js';

class ViewError extends PageViewElement {
  render() {
    return html`
      <style>
        section {
            text-align: center;
        }
      </style>
      <section>
        <h2>Oops! You hit a 404</h2>
        <p>The page you're looking for doesn't seem to exist.</p>
      </section>
    `
  }
}

window.customElements.define('view-error', ViewError);
