import { html } from '@polymer/lit-element';
import { PageViewElement } from '../helpers/page-view-element.js';

import { StylesShared } from '../styles/shared.js';

class ViewSkills extends PageViewElement {
  static get properties() {
    return {
      _skillsData: {
        type: Array
      },
      _skillsDesc: {
        type: String
      }
    }
  }

  constructor() {
    super();
    this._skillsData = [];
    this._skillsDesc = '';
  }

  firstUpdated() {
    this._fetchSkillsData(this);
  }

  render() {
    const skills = this._skillsData || [];
    const skillsDesc = this._skillsDesc || 'Click any of my skills for a brief description.';

    const skillList = skills.map((skill) => {
      return html `
        <li>
          <a
            @click="${this._setDesc}"
            @mouseover="${this._setDesc}"
            data-desc="${skill.description}">
            ${skill.name}
          </a>
        </li>
      `;
    });

    return html`
      ${StylesShared}
      <style>
        ul {
          display: inline-flex;
          align-items: center;
          flex-wrap: wrap;
          justify-content: space-evenly;
        }

        li {
          list-style: none;
        }

        a {
          color: #e5c116;
          display: inline-block;
          margin: 1rem;
          padding: 1rem;
          background: white;
          border-radius: 1rem;
          cursor: pointer;
        }

        p {
          color: rgba(0,0,0,0.25);
          font-size: 1.5rem;
          text-align: center;
        }

      </style>
      <section>
        <h2>Skills</h2>
        <ul>
          ${skillList}
        </ul>
        <p>${skillsDesc}</p>
      </section>
    `
  }

  _setDesc(event) {
    this._skillsDesc = event.target.dataset.desc;
  }

  _fetchSkillsData(host) {
    fetch("/?rest_route=/wp/v2/skills")
    .then(response => response.text())
    .then(text => {
      try {
        const data = JSON.parse(text);
        host._skillsData = data;
      } catch (error) {
        host._skillsData = [];
      }
    })
  }
}

window.customElements.define('view-skills', ViewSkills);
