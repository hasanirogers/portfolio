import { html } from '@polymer/lit-element';
import { PageViewElement } from '../helpers/page-view-element.js';

class ViewSkills extends PageViewElement {
  static get properties() {
    return {
      _skillsData: { type: Array },
      _skillsDesc: { type: String},
    }
  }

  constructor() {
    super();
    this._skillsData = [];
    this._skillsDesc = '';
  }

  firstUpdated() {
    this._fetchSkillsData();
  }

  render() {
    const skills = this._skillsData || [];
    let skillsDesc = this._skillsDesc || 'Hover or tap on any of my skills for a brief description.';
    let skillList;

    if (skills.length > 0) {
      skillList = skills.map((skill) => {
        return html `
          <li>
            <a
              class="round-btn"
              @click="${this._setDesc}"
              @mouseover="${this._setDesc}"
              data-desc="${skill.description}">
              ${skill.name}
            </a>
          </li>
        `;
      });
    } else {
      skillList = html`Hmmmm. Looks like you don't have any skills.`;
      skillsDesc = '';
    }

    return html`
      <link rel="stylesheet" href="/wp-content/themes/anubis/bundles/bundle.css">
      <style>
        ul {
          display: inline-flex;
          align-items: center;
          flex-wrap: wrap;
          justify-content: space-evenly;
          padding-bottom: 4rem;
        }

        li {
          list-style: none;
        }

        li:hover {
          animation: float 1s infinite ease-in-out alternate;
        }

        p {
          color: rgba(0,0,0,0.25);
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

          background: #e5c116;
          border-top: 1px solid white;
        }

        @media screen and (min-width: 768px) {
          ul {
            margin: 0 10%;
          }

          .skills-desc {
            position: static;
            padding: 0;
            border: none;
            background: transparent;
          }
        }

        @keyframes float {
          100% {
            transform: translateY(-20px);
          }
        }
      </style>
      <h3>Skills</h3>
      <section class="page">
        <ul>
          ${skillList}
        </ul>
        <p class="skills-desc">${skillsDesc}</p>
      </section>
    `
  }

  _setDesc(event) {
    this._skillsDesc = event.target.dataset.desc;
  }

  async _fetchSkillsData() {
    const skills = await fetch("/?rest_route=/wp/v2/skills/&per_page=99")
    .then(response => response.text())
    .then(text => {
      try {
        return JSON.parse(text);
      } catch (error) {
        console.log(error);
      }
    });

    this._skillsData = skills;
  }
}

window.customElements.define('view-skills', ViewSkills);
