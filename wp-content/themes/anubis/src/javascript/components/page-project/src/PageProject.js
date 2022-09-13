import { html, css, LitElement } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { decodeHTMLEntities } from '../../../utilities/utilities.js';
import { router } from '../../me-app/src/MeApp.js';
import { stylesAnimations, stylesBase, } from '../../me-app/src/styles.js';

export class PageProject extends LitElement {
  static get styles() {
    return [
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
          margin-top: 1rem;
          line-height: 1.5;
        }

        .page {
          max-height: 50vh;
          padding: 0 2vw;
          margin-top: -4vw;
          aspect-ratio: 16/9;
          text-align: center;
        }

        .button {
          margin-top: 1rem;
          border: 4px solid white;
        }

        @media screen and (min-width: 769px) {
          .page {
            margin-top: -4vh;
          }

          .button {
            position: absolute;
            right: calc(50% - 87px);
            bottom: 2rem;
            margin-top: 0;
          }

          .button:hover {
            color: white;
            animation: float 1s infinite ease-in-out alternate;
          }
        }
      `
    ]
  }

  static get properties() {
    return {
      project: {
        type: Object,
      },
      mappedSkills: {
        type: Array,
      },
    };
  }

  constructor() {
    super();
    this.project = {};
    this.mappedSkills = [];
  }

  firstUpdated() {
    this.fetchProject();
  }

  render() {
    return html`
      <h3>${decodeHTMLEntities(this.project?.title?.rendered)}</h3>
      <section class="page">
        <figure>
          ${this.makeHero()}
          ${this.makeLink()}
          <figcaption>${unsafeHTML(this.project?.content?.rendered)}</figcaption>
        </figure>
        <ul>
          <li><strong>Skills:&nbsp;</strong></li>
          ${this.makeSkills()}
        </ul>
      </section>
    `
  }

  makeLink() {
    if (this.project?.acf?.link) {
      return html`<a class="button" href="${this.project.acf.link}" target="_blank">Visit Project</a>`;
    }

    return null;
  }

  makeSkills() {
    return this.mappedSkills.map((skill) => html`<li>${skill}</li>`);
  }

  makeHero() {
    if (Object.keys(this.project).length > 0) {
      const featuredMedia = this.project._embedded['wp:featuredmedia'];
      return featuredMedia ? html`<img src="${featuredMedia[0].source_url}" />` : null;
    }

    return null;
  }

  async fetchProject() {
    const project = await fetch(`/?rest_route=/wp/v2/projects&slug=${router.location.params.slug}&_embed`)
      .then(response => response.text())
      .then(text => {
        try {
          return JSON.parse(text);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error);
          return null;
        }
      });

    this.project = project[0];
    this.fetchSkills(this.project.skills);
  }

  async fetchSkills(skillsArray) {
    const skills = await fetch(`/?rest_route=/wp/v2/skills&include=${skillsArray.join(',')}&per_page=99&order=asc`)
      .then(response => response.text())
      .then(text => {
        try {
          return JSON.parse(text);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error);
          return null;
        }
      });

    this.mappedSkills = skills.map((skill) => skill.name);
  }
}
