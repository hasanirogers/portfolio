import { LitElement, html, css } from 'lit-element';
import { Router } from '@vaadin/router';
// import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js';
import { stylesBase, stylesAnimations} from './styles.js';
import { stylesMenu } from './stylesMenu.js';
import { stylesSocialMedia } from './stylesSocialMedia.js';
import { templateAside } from './templates.js';

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

    // reactive properties
    this.page = location.pathname === '/' ? 'home' : location.pathname.replace('/', '');
    this.menuOpened = false;

    // installMediaQueryWatcher(`(min-width: 768px)`, (matches) => {
    //   this.smallScreen = !matches;
    // });

    // standard properties
    this.hamburger;
  }

  render() {
    return html`
      <nav class="menu ${this.menuOpened ? 'menu--opened' : ''}">
        <me-hamburger @click=${this.handleHamburger} class="menu__icon"></me-hamburger>
        <ul class="menu__items">
          <li><a @click=${() => this.handleLink('home')}>Home</a></li>
          <li><a @click=${() => this.handleLink('education')}>Education</a></li>
          <li><a @click=${() => this.handleLink('history')}>Work History</a></li>
          <li><a @click=${() => this.handleLink('skills')}>Skills</a></li>
          <li><a @click=${() => this.handleLink('websites')}>Websites</a></li>
          <li><a @click=${() => this.handleLink('accomplishments')}>Accomplishments</a></li>
          <li><a href="http://blog.hasanirogers.me">My Blog</a></li>
          <li><a href="http://contact.hasanirogers.me">Contact Me</a></li>
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
