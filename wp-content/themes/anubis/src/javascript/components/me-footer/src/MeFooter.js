import { html, css, LitElement } from 'lit';
import '../../me-waves/me-waves';

export class MeFooter extends LitElement {
  static get styles() {
    return [
      css`
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
      `
    ]
  }

  firstUpdated() {
    const links = this.shadowRoot.querySelector('slot').assignedElements()[0].querySelectorAll('a');

    links.forEach((link) => {
      const location = this.getLocationByString(link.href);
      const meApp = document.querySelector('me-app');

      link.addEventListener('click', (event) => {
        if (location.pathname !== '/') {
          meApp.page = location.pathname.replace('/', '');
        } else {
          meApp.page = 'home';
        }
      });
    });
  }

  render() {
    return html `
      <me-waves></me-waves>
      <footer>
        <slot></slot>
      </footer>
    `
  }

  getLocationByString(href) {
    const match = href.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);
    return match && {
        href: href,
        protocol: match[1],
        host: match[2],
        hostname: match[3],
        port: match[4],
        pathname: match[5],
        search: match[6],
        hash: match[7]
    }
  }
}
