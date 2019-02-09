import { html } from '@polymer/lit-element';
import { PageViewElement } from '../helpers/page-view-element.js';

import { StylesShared } from '../styles/shared.js';

class ViewHome extends PageViewElement {
  render() {
    return html`
      ${StylesShared}
      <style>
        section {
            text-align: center;
        }
      </style>
      <section>
        <header>
          <h2>Hasani Rogers</h2>
          <aside>Front End Developer</aside>
        </header>
        <nav>
          <ul>
            <li><a href="education/">Education</a></li>
          </ul>
        </nav>

      </section>
    `
  }
}

window.customElements.define('view-home', ViewHome);
