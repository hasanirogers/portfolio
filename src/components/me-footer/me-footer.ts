import { html, css, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { getLinks, socialLinks } from '../../shared/links';
import { IRoute } from '../../shared/types';
import { MeApp } from '../me-app/me-app';

import '../../components/me-waves/me-waves';

@customElement('me-footer')
export class MeFooter extends LitElement {
  static styles = [
    css`
      :host {
        text-transform: capitalize;
      }

      a,
      button {
        color: var(--color-background);
        text-decoration: none;
        transition: color 0.3s ease;
      }

      button:hover,
      a:hover {
        color: var(--color-secondary);
      }

      me-waves {
        display: block;
      }

      footer {
        color: var(--color-background);
        display: block;
        padding: 1rem 0;
        background: #ffffff;
      }

      @media (min-width: 768px) {
        footer {
          padding: 4rem 0 2rem 0;
        }
      }

      footer button {
        font-size: inherit;
        cursor: pointer;
        border: 0;
        background: transparent;
        text-transform: capitalize;
      }

      .footer-menu {
        display: none;
        justify-content: center;
        list-style: none;
        gap: 2rem;
        font-size: 1.25rem;
      }

      @media (min-width: 768px) {
        .footer-menu {
          display: flex;
        }
      }

      .social-menu ul {
        display: flex;
        list-style: none;
        align-items: center;
        justify-content: space-around;
        padding: 0 1rem;
      }

      @media (min-width: 768px) {
        .social-menu ul {
          gap: 2rem;
          justify-content: center;
        }
      }

      .social-menu a {
        color: var(--color-background);
      }

      .social-menu a:hover {
        color: var(--color-secondary);
      }

      .social-menu svg {
        width: 32px;
        height: 32px;
      }

      .social-menu path {
        fill: var(--color-background);
        transition: all 0.3s ease;
      }

      .social-menu svg:hover path {
        fill: var(--color-secondary);
      }
    `
  ];

  @state()
  meApp: MeApp = document.querySelector('me-app') as MeApp;

  render() {
    return html `
      <me-waves></me-waves>
      <footer>
        <nav class="footer-menu">
          ${this.makeLinks()}
        </nav>
        <nav class="social-menu">
          <ul>
            ${this.makeSocialLinks()}
          </ul>
        </nav>
      </footer>
    `
  }

  handleLink(page: string) {
    this.meApp.hamburger!.transformIcon();
    this.meApp.menuOpened = false;
    this.meApp.switchRoute(page);
  }

  makeLinks() {
    const links = getLinks().map((link: IRoute) => {
      return link.url
        ? html`<li><a href="${link.url}" target="_blank">${link.name}</a></li>`
        : html`<li><button @click=${() => this.handleLink(link.name as string)}>${link.name}</button></li>`;
    });

    return links;
  }

  makeSocialLinks() {
    const links = socialLinks.map((link) => {
      return html`<li><a href=${link.href} target="_blank" title=${link.title}>${link.icon}</a></li>`
    });

    return links;
  }
}
