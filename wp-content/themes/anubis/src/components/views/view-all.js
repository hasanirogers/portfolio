import { LitElement, html } from 'lit-element';
import { installRouter } from 'pwa-helpers/router.js';
import { updateMetadata } from 'pwa-helpers/metadata.js';

class ViewAll extends LitElement {
  render() {
    const {_page} = this;

    return html `
      <style>
        :host > *:not([active]) {
          display: none;
        }
      </style>
      <view-home class="view" ?active="${_page === 'home/'}"></view-home>
      <view-skills class="view" ?active="${_page === 'skills/'}"></view-skills>
      <view-websites class="view" ?active="${_page === 'websites/'}"></view-websites>
      <view-accomplishments class="view" ?active="${_page === 'accomplishments/'}"></view-accomplishments>
      <view-history class="view" ?active="${_page === 'history/'}"></view-history>
      <view-education class="view" ?active="${_page === 'education/'}"></view-education>
      <view-contact class="view" ?active="${_page === 'contact/'}"></view-contact>
      <view-error class="view" ?active="${_page === 'error/'}"></view-error>
    `
  }

  static get properties() {
    return {
      appTitle: { type: String },
      _page: { type: String }
    }
  }

  constructor() {
    super();
  }

  firstUpdated() {
    installRouter((location) => {
      // docs: https://github.com/Polymer/pwa-helpers#routerjs
      this._locationChanged(location);
    });
  }

  updated(changedProps) {
    // console.log(changedProps);
    if (changedProps.has('_page')) {
      const pageTitle = this.appTitle + ' | ' + this._stripSlash(this._page);

      // docs: https://github.com/Polymer/pwa-helpers#metadatajs
      updateMetadata({
        title: pageTitle,
        description: pageTitle
      });
    }
  }

  _locationChanged() {
    const path = window.decodeURIComponent(window.location.pathname);
    const page = path === '/' ? 'home/' : path.slice(1);
    const body = document.querySelector('body');
    const bodyClass = 'page--'+ this._stripSlash(page);

    body.className = '';
    body.classList.add(bodyClass);
    this._loadPage(page);
  }

  _stripSlash(page) {
    return page.substring(0, page.length - 1);
  }

  _loadPage(page) {
    switch(page) {
      case 'home/':
        import('./view-home.js').then((module) => {
          // Put code in here that you want to run every time when
          // navigating to view1 after my-view1.js is loaded.
        });
        break;
      case 'skills/':
        import('./view-skills.js');
        break;
      case 'websites/':
        import('./view-websites.js');
        break;
      case 'accomplishments/':
        import('./view-accomplishments.js');
        break;
      case 'history/':
        import('./view-history.js');
        break;
      case 'education/':
        import('./view-education.js');
        break;
      case 'contact/':
        import('./view-contact.js');
      default:
        page = 'error/';
        import('./view-error.js');
    }

    this._page = page;
  }
}

customElements.define('view-all', ViewAll);
