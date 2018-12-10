import { html } from '@polymer/lit-element';
import { PageViewElement } from '../helpers/page-view-element.js';

import { StylesShared } from '../styles/shared.js';

class ViewSkills extends PageViewElement {
  render() {
    return html`
      ${StylesShared}
      <style>
        section {
            text-align: center;
        }
      </style>
      <section>
        <h2>Skills</h2>
      </section>
    `
  }
}

window.customElements.define('view-skills', ViewSkills);
