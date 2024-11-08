import { css } from 'lit';

export const stylesMenu = css`
  .menu {
    position: absolute;
    right: 0;
    z-index: 9;
    margin: 0;
    padding: 0;
    width: 56px;
    height: 56px;
    background-color: var(--color-white);
    border-bottom-left-radius: 100%;
    box-shadow: 0 2px 5px rgba(0,0,0,0.26);
  }

  .menu li {
      display: none;
  }

  .menu a,
  .menu button {
    cursor: pointer;
    color: var(--color-primary);
    line-height: 2;
    font-size: 1.5rem;
    font-weight: normal;
    text-decoration: none;
    border: 0;
    background: transparent;
    text-transform: capitalize;
  }

  .menu--opened {
    animation: open-menu 1s ease both;
  }

  .menu--opened li {
    display: block;
    transition: all 300ms ease;
  }

  .menu--opened li:hover {
    transform: translateX(1rem);
  }

  .menu__icon {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }

  .menu__items {
    text-align: right;
    margin: 64px;
    padding: 0;
  }

  @media screen and (min-width: 768px) {
    .menu {
      width: 110px;
      height: 110px;
    }

    .menu__icon {
      top: 28px;
      right: 28px;
    }
  }
`;
