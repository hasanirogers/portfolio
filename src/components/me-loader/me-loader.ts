import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('me-loader')
export class MeLoader extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        visibility: hidden;
      }

      :host([loading]) {
        visibility: visible;
      }

      .ellipsis {
        display: inline-block;
        position: relative;
        width: 80px;
        height: 50px;
      }
      .ellipsis div {
        position: absolute;
        top: 33px;
        width: 13px;
        height: 13px;
        border-radius: 50%;
        background: #fff;
        animation-timing-function: cubic-bezier(0, 1, 1, 0);
      }
      .ellipsis div:nth-child(1) {
        left: 8px;
        animation: ellipsis1 0.6s infinite;
      }
      .ellipsis div:nth-child(2) {
        left: 8px;
        animation: ellipsis2 0.6s infinite;
      }
      .ellipsis div:nth-child(3) {
        left: 32px;
        animation: ellipsis2 0.6s infinite;
      }
      .ellipsis div:nth-child(4) {
        left: 56px;
        animation: ellipsis3 0.6s infinite;
      }
      @keyframes ellipsis1 {
        0% {
          transform: scale(0);
        }
        100% {
          transform: scale(1);
        }
      }
      @keyframes ellipsis3 {
        0% {
          transform: scale(1);
        }
        100% {
          transform: scale(0);
        }
      }
      @keyframes ellipsis2 {
        0% {
          transform: translate(0, 0);
        }
        100% {
          transform: translate(24px, 0);
        }
      }
    `
  ];

  @property({ type: Boolean, reflect: true })
  loading: boolean = false;

  render() {
    return html`<div class="ellipsis"><div></div><div></div><div></div><div></div></div>`;
  }
}
