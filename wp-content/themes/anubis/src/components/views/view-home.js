import { html } from 'lit-element';
import { PageViewElement } from '../helpers/page-view-element.js';


class ViewHome extends PageViewElement {
  render() {
    return html`
      <style></style>
    `
  }
}

window.customElements.define('view-home', ViewHome);
