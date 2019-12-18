import { LitElement, html, css } from 'lit-element';
// import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js';
import { Router } from '@vaadin/router';

import '../../page-home/page-home.js';
import '../../page-accomplishments/page-accomplishments.js';
import '../../page-education/page-education.js';
import '../../page-history/page-history.js';
import '../../page-skills/page-skills.js';
import '../../page-websites/page-websites.js';

export class MeApp extends LitElement {

  // static get styles() {
  //   return [
  //     css`
  //     `,
  //   ];
  // }

  static get properties() {
    return {
      title: { type: String },
      page: { type: String },
      smallScreen: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.page = location.pathname === '/' ? 'home' : location.pathname.replace('/', '');

    // installMediaQueryWatcher(`(min-width: 768px)`, (matches) => {
    //   this.smallScreen = !matches;
    // });
  }

  render() {
    return html`
      <section id="outlet"></section>
    `;
  }

  firstUpdated() {
    const router = new Router(this.shadowRoot.getElementById('outlet'));

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
    if (route === '' || route === '/') this.page = 'main';
    Router.go(`/${route}`);
  }
}
