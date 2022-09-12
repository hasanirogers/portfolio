import { LitElement, html, css } from 'lit';
import { Router } from '@vaadin/router';
import { stylesBase, stylesAnimations} from './styles.js';
import { stylesMenu } from './stylesMenu.js';
import { stylesSocialMedia } from './stylesSocialMedia.js';
import { templateAside } from './templates.js';

import "core-js/stable";
import "regenerator-runtime/runtime";

import '../../me-hamburger/me-hamburger.js';
import '../../page-home/page-home.js';
import '../../page-accomplishments/page-accomplishments.js';
import '../../page-education/page-education.js';
import '../../page-history/page-history.js';
import '../../page-skills/page-skills.js';
import '../../page-projects/page-projects.js';
import '../../page-project/page-project.js';

export const router = new Router();
export class MeApp extends LitElement {

  static get styles() {
    return [
      stylesBase,
      stylesAnimations,
      stylesMenu,
      stylesSocialMedia,
      css`
        section {
          min-height: 100vh;
          display: flex;
        }

        main {
          display: flex;
          flex: 1;
        }

        main > * {
          margin: auto;
          margin-top: 18vh;
        }

        aside {
          position: absolute;
          right: 2rem;
          top: 50%;
          transform: translateY(-50%);
          transition: all 1s ease;
        }

        aside > * {
          text-align: right;
          margin: auto;
        }

        :host(:not([page="home"])) aside {
          top: 1rem;
          right: calc(100% - 200px - 1rem);
          transform: translateY(0)
        }

        @media screen and (min-width: 768px) {
          :host(:not([page="home"])) aside {
            right: calc(100% - 424px - 2rem);
          }
        }

        :host(:not([page="home"])) aside > * {
          text-align: left;
        }

        :host([page="websites"]) aside {
          display: none;
        }
      `,
    ];
  }

  static get properties() {
    return {
      title: { type: String },
      page: { type: String, reflect: true, },
      menuOpened: { type: Boolean },
      smallScreen: { type: Boolean },
      menu: { type: Array },
    };
  }

  constructor() {
    super();

    // defaults
    this.page = window.location.pathname === '/' ? 'home' : window.location.pathname.replace('/', '');
    this.menuOpened = false;
    this.menu = [];
  }

  render() {
    return html`
      <nav class="menu ${this.menuOpened ? 'menu--opened' : ''}">
        <me-hamburger @click=${this.handleHamburger} class="menu__icon"></me-hamburger>
        <ul class="menu__items">
          ${this.makeLinks()}
        </ul>
      </nav>

      <section>
        <main></main>
        <aside>${templateAside}</aside>
      </section>
    `;
  }

  firstUpdated() {
    router.setOutlet(this.shadowRoot.querySelector('main'));
    this.hamburger = this.shadowRoot.querySelector('me-hamburger');
    this.fetchMenu();

    router.setRoutes([
      {
        path: '/',
        component: 'page-home'
      },
      {
        path: '/accomplishments',
        name: 'accomplishments',
        component: 'page-accomplishments'
      },
      {
        path: '/education',
        name: 'education',
        component: 'page-education'
      },
      {
        path: '/history',
        name: 'history',
        component: 'page-history'
      },
      {
        path: '/skills',
        name: 'skills',
        component: 'page-skills'
      },
      {
        path: '/websites',
        redirect: '/projects'
      },
      {
        path: '/projects',
        name: 'projects',
        component: 'page-projects'
      },
      {
        path: '/project/:slug',
        name: 'project',
        component: 'page-project'
      },
      {
        path: '(.*)',
        redirect: '/',
        action: () => { this.page = 'home'; }
      }
    ]);
  }

  /**
   * A helper that handles switching pages
   * @param {string} route
   */
  switchRoute(route) {
    this.page = route;
    if (route === '' || route === '/') this.page = 'home';
    Router.go(`/${route}`);
  }

  handleHamburger() {
    this.hamburger.transformIcon();
    this.menuOpened = !this.menuOpened;
  }

  handleLink(page) {
    this.hamburger.transformIcon();
    this.menuOpened = false;
    this.switchRoute(page);
  }

  makeLinks() {
    const links = this.menu.map((link) => {
      const firstCharacter = link.url.substring(0, 1);
      const slug = link.url.replace('/', '');

      return firstCharacter === '/'
        ? html`<li><button @click=${() => this.handleLink(slug)}>${link.title}</button></li>`
        : html`<li><a href="${link.url}" target="_blank">${link.title}</a></li>`;
    });

    return links;
  }

  async fetchMenu() {
    const menu = await fetch('/?rest_route=/me/v1/menu/footer-menu')
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

    this.menu = menu;
  }
}
