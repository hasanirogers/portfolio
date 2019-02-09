import { html } from '@polymer/lit-element';
import { PageViewElement } from '../helpers/page-view-element.js';

import { StylesShared } from '../styles/shared.js';

class ViewSkills extends PageViewElement {
  static get properties() {
    return {
      _skillsData: {
        type: Array
      }
    }
  }

  constructor() {
    super();
    this._skillsData = [];
  }

  firstUpdated() {
    this._fetchSkillsData(this);
  }



  render() {
    const skills = this._skillsData || [];

    const skillList = skills.map((skill) => {
      return html `
        <li>
          <h3>${skill.name}</h3>
          <p>${skill.description}</p>
        </li>
      `;
    });


    return html`
      ${StylesShared}
      <style>
        ul {
          list-style: none;
          position: relative;
        }

        li {
          position: absolute;
          left: 100px;
        }
      </style>
      <section>
        <h2>Skills</h2>
        <ul>
          ${skillList}
        </ul>
      </section>
    `
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
