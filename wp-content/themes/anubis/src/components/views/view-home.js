import { html } from '@polymer/lit-element';
import { PageViewElement } from '../helpers/page-view-element.js';

import { gitHub } from '../styles/icons';
import { codePen } from '../styles/icons';
import { npm } from '../styles/icons';
import { linkedIn } from '../styles/icons';


import { StylesShared } from '../styles/shared.js';

class ViewHome extends PageViewElement {
  render() {
    return html`
      ${StylesShared}
      <style>
        h2 + aside {
          font-size: 1.5rem;
        }
      </style>
    `
  }
}

window.customElements.define('view-home', ViewHome);
