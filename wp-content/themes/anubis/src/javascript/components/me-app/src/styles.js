import { css } from 'lit';


export const stylesBase = css`
  h1 {
    margin: 0;
    font-size: 2rem;
    text-shadow: 0 2px 2px rgba(0, 0, 0, 0.26);
  }

  @media screen and (min-width: 768px) {
    h1 {
        font-size: 3rem;
    }
  }

  h2 {
    color:rgba(255,255,255,0.25);
    margin: 0;
    font-size: 1.5rem;
  }

  h3 {
    display: none;
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

  ul {
    padding: 0;
  }

  a {
    color: var(--color-white);
    font-weight: bold;
    text-decoration: none;
    display: inline-block;
    padding: 2px 4px;
    transition: color 300ms ease;
  }

  a:hover {
    color: var(--color-secondary);
  }

  .page {
    animation: intro 1s ease-out;
  }

  .round-btn {
    color: var(--color-primary);
    display: inline-block;
    margin: 1rem;
    padding: 1rem;
    background: white;
    border-radius: 1rem/2rem;
    cursor: pointer;
    text-decoration: none;
  }

  .button {
    cursor: pointer;
    letter-spacing: 1px;
    display: inline-block;
    width: auto;
    color: white;
    padding: 1rem 2rem;
    position: relative;
    z-index: 1;
    border-radius: 1rem / 2rem;
    background-color: var(--color-primary);
  }
`;

export const stylesAnimations = css`
  @keyframes fade-in {
      0% {opacity: 0;}
      100% {opacity: 1;}
  }

  @keyframes paginator-fade {
      from {opacity: 0.4}
      to {opacity: 1}
  }

  @keyframes open-menu {
      50% {
          width: 3000px;
          height: 3000px;
      }
      100% {
          width: 100%;
          height: 100%;
          border-radius: 0;
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

  @keyframes float {
    100% {
      transform: translateY(-10px);
    }
  }
`;
