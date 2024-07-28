import { html, css, LitElement } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { customElement, queryAll, state } from 'lit/decorators.js';
import { stylesAnimations, stylesBase } from '../../assets/styles';
import { projects, skills } from '../../shared/content.js';
import { MeProject } from './me-project.js';

import 'kemet-ui/dist/components/kemet-combo/kemet-combo';
import 'kemet-ui/dist/components/kemet-input/kemet-input';
import './me-project';

@customElement('page-projects')
export class PageProjects extends LitElement {
  static styles = [
    stylesBase,
    stylesAnimations,
    css`
      kemet-field {
        position: relative;
        z-index: 2;
        grid-column: span 3;
      }

      kemet-combo {
        --kemet-combo-background-color: white;
        color: var(--color-background);
      }

      kemet-input {
        width: 100%;
        position: relative;
        top: -0.5rem;
      }

      kemet-input::part(input) {
        color: white;
        padding: 0 1rem;
        background: transparent;
        border: 0;
        border-bottom: 1px solid white;
      }

      me-projects {
        display: grid;
        gap: 2vw;
        grid-template-rows: repeat(5, 1fr);
        grid-template-columns: repeat(3, 1fr);
        margin: auto;
        height: 100%;
        max-width: 96vw;
        max-height: 65vh;
        overflow: auto;
        position: relative;
        top: -2vh;
        z-index: 1;
      }

      @media screen and (min-width: 769px) {
        kemet-field {
          position: absolute;
          top: -5.5rem;
          width: 30%;
          left: 50%;
          transform: translateX(-50%);
        }

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

      me-projects > :nth-child(16) {
        animation-delay: 1.6s;
      }

      .page {
        display: block;
        width: 96vw;
        padding: 0 2vw;
      }
    `
  ];

  @state()
  query: string = '';

  @queryAll('me-project')
  projectElements!: MeProject[];

  constructor() {
    super();
    this.addEventListener('kemet-combo-selection', (event: any) => {
      this.query = event.detail.text;
      this.highlightProjects();
    });
  }

  render() {
    return html`
      <h3>Projects</h3>
      <section class="page">
        <me-projects>
          <kemet-field slug="skills">
            <kemet-input
              slot="input"
              name="input"
              placeholder="Type a skill (eg WordPress) to filter the projects by it."
              @blur=${(event: any) => this.handleProjectBlur(event)}>
            </kemet-input>
            <kemet-combo slot="component" .options=${skills}></kemet-combo>
          </kemet-field>
          ${this.makeProjects()}
        </me-projects>
      </section>
    `
  }

  highlightProjects() {
    this.projectElements.forEach((project: MeProject) => {
      if (project.skills.includes(this.query) && this.query !== '') {
        project.gray = false;
      } else {
        project.gray = true;
      }
    })
  }

  makeProjects() {
    return projects.map((project) => {
      return html`
        <me-project
          size="${project.size}"
          slug="${project.slug}"
          heading="${project.heading}"
          thumb="${project.thumb}"
          half=${ifDefined(project.halfThumb)}
          .skills=${project.skills}>
        </me-project>
      `;
    });
  }

  handleProjectBlur(event: any) {
    this.query = event.target.value;
    this.highlightProjects();

    setTimeout(() => {
      const combo = this.shadowRoot!.querySelector('kemet-combo');
      combo!.show = false;
    }, 500);
  }
}
