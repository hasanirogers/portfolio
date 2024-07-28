import { html, css, LitElement } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { router } from '../me-app/me-app';
import { stylesAnimations, stylesBase, } from '../../assets/styles';
import { customElement, property } from 'lit/decorators.js';
import { projects } from '../../shared/content';

import 'kemet-ui/dist/components/kemet-icon/kemet-icon';
import { Router } from '@vaadin/router';

@customElement('page-project')
export class PageProject extends LitElement {
  static styles = [
    stylesBase,
    stylesAnimations,
    css`
      img {
        max-width: 100%;
        border: 4px solid white;
      }

      ul {
        display: inline-flex;
        gap: 0.5rem;
        justify-content: center;
        margin: 0;
        list-style: none;
        flex-wrap: wrap;
      }

      li:not(:last-child):not(:first-child):after {
        content: ',';
      }

      figure {
        margin: 0;
        position: relative;
      }

      figcaption {
        margin: 1rem 0;
        line-height: 1.5;
      }

      kemet-icon {
        position: absolute;
        top: -3rem;
        right: 1rem;
        cursor: pointer;
      }

      .page {
        max-height: 50vh;
        padding: 0 2vw;
        margin-top: -4vw;
        aspect-ratio: 16/9;
        text-align: center;
        position: relative;
      }

      .button {
        margin-top: 1rem;
        border: 4px solid white;
        filter: drop-shadow(2px 4px 6px black);
      }

      @media screen and (min-width: 769px) {
        .page {
          margin-top: -4vh;
        }

        .button {
          position: absolute;
          right: 2rem;
          bottom: 5rem;
          margin-top: 0;
        }

        .button:hover {
          color: white;
          animation: float 1s infinite ease-in-out alternate;
        }
      }
    `
  ];

  @property()
  project: any = {};

  firstUpdated() {
    // router does not have access to slug until firstUpdated
    this.project = projects.filter(project => project.slug === router.location.params.slug)[0];
  }

  render() {
    return html`
      <h3>${this.project.heading}</h3>
      <section class="page">
        <kemet-icon icon="x-lg" size="32" @click=${() => this.goBack()}></kemet-icon>
        <figure>
          <img src="${this.project.hero}" alt="${this.project.heading}" />
          ${this.makeLink()}
          <figcaption>${unsafeHTML(this.project.description)}</figcaption>
        </figure>
        <ul>
          <li><strong>Skills:&nbsp;</strong></li>
          ${this.makeSkills()}
        </ul>
      </section>
    `
  }

  makeLink() {
    if (this.project.link) {
      return html`<a class="button" href="${this.project.link}" target="_blank">Visit Project</a>`;
    }

    return null;
  }

  makeSkills() {
    return this.project.skills
      ? this.project.skills.map((skill: string) => html`<li>${skill}</li>`)
      : null;
  }

  goBack() {
    Router.go('/projects');
  }
}
