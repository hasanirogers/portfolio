import { html, css, LitElement } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { stylesAnimations, stylesBase } from '../../me-app/src/styles.js';
import '../../me-project/me-project.js';

export class PageProjects extends LitElement {
  static get styles() {
    return [
      stylesBase,
      stylesAnimations,
      css`
        me-projects {
          display: grid;
          gap: 2vw;
          grid-template-rows: repeat(5, 1fr);
          grid-template-columns: repeat(3, 1fr);
          margin: auto;
          height: 100%;
          max-width: 96vw;
          max-height: 50vh;
          overflow: auto;
          position: relative;
          top: -2vh;
          z-index: 1;
        }

        @media screen and (min-width: 769px) {
          me-projects {
            height: auto;
            max-height: 64vh;
            overflow: visible;
            aspect-ratio: 16/9;
            gap: 1.5rem;
            grid-template-rows: repeat(4, 1fr);
            grid-template-columns: repeat(6, 1fr);
          }
        }

        me-projects > * {
          opacity: 0;
          animation: fade-in 300ms ease forwards;
        }

        me-projects > :nth-child(1) {
          animation-delay: 0.1s;
        }

        me-projects > :nth-child(2) {
          animation-delay: 0.2s;
        }

        me-projects > :nth-child(3) {
          animation-delay: 0.3s;
        }

        me-projects > :nth-child(4) {
          animation-delay: 0.4s;
        }

        me-projects > :nth-child(5) {
          animation-delay: 0.5s;
        }

        me-projects > :nth-child(6) {
          animation-delay: 0.6s;
        }

        me-projects > :nth-child(7) {
          animation-delay: 0.7s;
        }

        me-projects > :nth-child(8) {
          animation-delay: 0.8s;
        }

        me-projects > :nth-child(9) {
          animation-delay: 0.9s;
        }

        me-projects > :nth-child(10) {
          animation-delay: 1s;
        }

        me-projects > :nth-child(11) {
          animation-delay: 1.1s;
        }

        me-projects > :nth-child(12) {
          animation-delay: 1.2s;
        }

        me-projects > :nth-child(13) {
          animation-delay: 1.3s;
        }

        me-projects > :nth-child(14) {
          animation-delay: 1.4s;
        }

        me-projects > :nth-child(15) {
          animation-delay: 1.5s;
        }

        .page {
          display: block;
          width: 96vw;
          padding: 0 2vw;
        }
      `
    ]
  }

  static get properties() {
    return {
      projects: {
        type: Array,
      },
    };
  }

  constructor() {
    super();
    this.projects = [];
  }

  firstUpdated() {
    this.fetchProjects();
  }

  render() {
    return html`
      <h3>Projects</h3>
      <section class="page">
        <me-projects>
          ${this.makeProjects()}
        </me-projects>
      </section>
    `
  }

  makeProjects() {
    const projects = this.projects.map((project) => {
      const halfThumb = project.acf.half !== '' ? project.acf.half : false;

      return html`
        <me-project size="${project.acf.size}" slug="${project.slug}" heading="${project.title.rendered}" thumb="${project.acf.thumb}" half=${ifDefined(halfThumb)}></me-project>
      `;
    });

    return projects;
  }

  async fetchProjects() {
    const projects = await fetch("/?rest_route=/wp/v2/projects&per_page=99&order=asc&_embed")
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

    this.projects = projects;
  }
}
