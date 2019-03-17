import { html } from '@polymer/lit-element';

export const StylesShared = html `
  <style>
    :host([active]) > section {
      animation: intro 1s ease-out;
    }

    h3 {
      display: none;
    }

    ul {
      padding: 0;
    }

    @media screen and (min-width: 768px) {
      h3 {
        display: block;

        position: absolute;
        top: 28px;
        right: 120px;

        margin: 0;
        font-size: 2rem;
        text-shadow: 0 2px 2px rgba(0, 0, 0, 0.26);
      }
    }

    @keyframes intro {
      0% {
        opacity: 0;
        transform: translateY(-4rem);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
  </style>
`;
