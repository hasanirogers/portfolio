import { html, css, LitElement } from 'lit';
import { stylesBase, stylesAnimations } from '../../assets/styles';
import { customElement } from 'lit/decorators.js';
import { education } from '../../shared/content';

@customElement('page-education')
export class PageEducation extends LitElement {
  static styles = [
    stylesBase,
    stylesAnimations,
    css `
      section {
        text-align: center;
        font-size: 2rem;
      }
    `
  ];

  render() {
    return html`
      <h3>Education</h3>
      <section class="page">
        ${education}
      </section>
    `
  }
}
