import { html, css, LitElement } from 'lit';
import { stylesBase, stylesAnimations } from '../../me-app/src/styles.js';

export class PageSkills extends LitElement {
  static get styles() {
    return [
      stylesBase,
      stylesAnimations,
      css`
        ul {
          display: inline-flex;
          align-items: center;
          flex-wrap: wrap;
          justify-content: space-evenly;
          padding-bottom: 4rem;
        }

        @media screen and (min-width: 768px) {
          ul {
            margin: 0 10%;
          }
        }

        li {
          list-style: none;
        }

        li:hover {
          animation: float 1s infinite ease-in-out alternate;
        }

        p {
          color: rgba(255,255,255,0.25);
          font-size: 1.5rem;
          text-align: center;
        }

        .skills-desc {
          width: 100%;
          margin: 0;
          padding: 1rem;
          box-sizing: border-box;

          position: fixed;
          bottom: 0;

          background: var(--color-background);
          border-top: 1px solid white;
        }

        @media screen and (min-width: 768px) {
          .skills-desc {
            position: static;
            padding: 0 2rem;
            border: none;
            background: transparent;
          }
        }
      `
    ]
  }

  static get properties() {
    return {
      skillsData: { type: Array },
      skillsDesc: { type: String},
    }
  }

  constructor() {
    super();
    this.skillsData = [];
    this.skillsDesc = '';
  }

  render() {
    const skillsDesc = this.skillsDesc || 'Hover or tap on any of my skills for a brief description.';

    return html`
      <h3>Skills</h3>
      <section class="page">
        <ul>
          ${this.displaySkillsList()}
        </ul>
        <p class="skills-desc">${skillsDesc}</p>
      </section>
    `
  }

  firstUpdated() {
    this.fetchSkillsData();
  }

  displaySkillsList() {
    let skillList;

    if (this.skillsData.length > 0) {
      skillList = this.skillsData.map((skill) => {
        return html `
          <li>
            <a
              class="round-btn"
              @click="${this.setDesc}"
              @mouseover="${this.setDesc}"
              data-desc="${skill.description}">
              ${skill.name}
            </a>
          </li>
        `;
      });
    } else {
      skillList = html`Hmmmm. Looks like you don't have any skills.`;
    }

    return skillList;
  }

  setDesc(event) {
    this.skillsDesc = event.target.dataset.desc;
  }

  async fetchSkillsData() {
    const skills = await fetch("/?rest_route=/wp/v2/skills/&per_page=99")
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

    this.skillsData = skills;
  }
}
