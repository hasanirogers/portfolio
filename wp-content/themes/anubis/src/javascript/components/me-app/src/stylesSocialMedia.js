import { css } from 'lit';

export const stylesSocialMedia = css`
  .social-media {
    display: none;
    transition: transform 0.5s ease;
  }

  @media screen and (min-width: 768px) {
    .social-media {
      display: block;
      margin-top: 1rem;
      overflow: hidden;
    }

    .social-media ul {
        display: flex;
        align-items: center;
        margin: 0;
        padding: 0;
    }

    .social-media li {
        list-style: none;
    }

    .social-media li:not(:last-child) {
        margin-right: 1rem;
    }

    .social-media a {
        width: 72px;
        height: 72px;
        display: block;
        padding: 0;
        background: transparent;
    }

    .social-media svg {
        width: 100%;
        height: 100%;
        fill: var(--color-white);
        transition: all 300ms ease;
    }

    .social-media svg:hover {
        fill: var(--color-secondary);
    }
  }

  @media screen and (min-width: 769px) {
    :host([page="websites"]) {
        transform: translate(340px, -100px);
    }
  }
`;
