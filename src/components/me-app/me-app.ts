import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { Router } from '@vaadin/router';
import routes from '../../shared/routes';
import { stylesBase, stylesAnimations} from '../../assets/styles';
import { stylesMenu } from './styles.menu';
import { stylesSocialMedia } from './styles.social';
import { MeHamburger } from '../me-hamburger/me-hamburger';
import { templateAside } from './templates';
import { getLinks } from '../../shared/links';
import { IRoute } from '../../shared/types';

import '../me-hamburger/me-hamburger';
import '../page-education/page-education';
import '../page-history/page-history';
import '../page-projects/page-projects';
import '../page-projects/page-project';
import '../page-contact/page-contact';

export const router = new Router();

@customElement('me-app')
export class MeApp extends LitElement {
  static styles = [
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
          right: calc(100% - 200px - 1.5rem);
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
      `,
  ];

  @property()
  title: string = '';

  @property({ reflect: true })
  page: string = window.location.pathname === '/' ? 'home' : window.location.pathname.replace('/', '');

  @property()
  menuOpened: boolean = false;

  @property()
  smallScreen!: boolean;

  @property()
  menu: any[] = [];

  @state()
  hamburger!: MeHamburger | null;

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
    router.setOutlet(this.shadowRoot!.querySelector('main'));
    this.hamburger = this.shadowRoot!.querySelector('me-hamburger');
    router.setRoutes(routes);
  }

  /**
   * A helper that handles switching pages
   * @param {string} route
   */
  switchRoute(route: string) {
    this.page = route;
    if (route === '' || route === '/') this.page = 'home';
    Router.go(`/${route}`);
  }

  handleHamburger() {
    this.hamburger!.transformIcon();
    this.menuOpened = !this.menuOpened;
  }

  handleLink(page: string) {
    this.hamburger!.transformIcon();
    this.menuOpened = false;
    this.switchRoute(page);
  }

  makeLinks() {
    const links = getLinks().map((link: IRoute) => {
      return link.url
        ? html`<li><a href="${link.url}" target="_blank">${link.name}</a></li>`
        : html`<li><button @click=${() => this.handleLink(link.name as string)}>${link.name}</button></li>`;
    });

    return links;
  }
}
