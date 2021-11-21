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
import '../../page-websites/page-websites.js';


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
          padding-top: 10rem;
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
          right: calc(100% - 236px - 1rem);
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
    };
  }

  constructor() {
    super();

    // defaults
    this.page = window.location.pathname === '/' ? 'home' : window.location.pathname.replace('/', '');
    this.menuOpened = false;
  }

  render() {
    return html`
      <nav class="menu ${this.menuOpened ? 'menu--opened' : ''}">
        <me-hamburger @click=${this.handleHamburger} class="menu__icon"></me-hamburger>
        <ul class="menu__items">
          <li><button @click=${() => this.handleLink('home')}>Home</button></li>
          <li><button @click=${() => this.handleLink('education')}>Education</button></li>
          <li><button @click=${() => this.handleLink('history')}>Work History</button></li>
          <li><button @click=${() => this.handleLink('skills')}>Skills</button></li>
          <li><button @click=${() => this.handleLink('websites')}>Websites</button></li>
          <li><button @click=${() => this.handleLink('accomplishments')}>Accomplishments</button></li>
          <li><a href="https://blog.hasanirogers.me">My Blog</a></li>
          <li><a href="https://contact.hasanirogers.me">Contact Me</a></li>
        </ul>
      </nav>

      <section>
        <main></main>
        <aside>${templateAside}</aside>
      </section>
    `;
  }

  firstUpdated() {
    const router = new Router(this.shadowRoot.querySelector('main'));
    this.hamburger = this.shadowRoot.querySelector('me-hamburger');

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
        name: 'websites',
        component: 'page-websites'
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
}
