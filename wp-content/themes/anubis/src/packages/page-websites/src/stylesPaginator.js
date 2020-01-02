import { css } from 'lit-element';

export const stylesPaginator = css`
  .pagenator img {
    width: 100%;
    border-radius: 2rem;
  }

  .pagenator__container {
    margin: auto;
    display: flex;
    width: 98%;
    min-height: 320px;
  }

  @media screen and (min-width: 768px) {
    .pagenator__container {
      width: 85%;
      max-height: 80vh;
    }
  }

  @media screen and (min-width: 1440px) {
    .pagenator__container {
      width: 70%;
      max-height: 80vh;
    }
  }

  .pagenator__page {
    width: 100%;
    height: 100%;
    margin: auto;
    display: none;
    animation-name: paginator-fade;
    animation-duration: 1.5s;
  }

  .pagenator__paginator {
    margin: 2rem 0;
  }

  .pagenator__navitem {
    cursor: pointer;
    font-size: 0;
    line-height: 0;
    text-indent: -9999;
    display: inline-block;
    width: 32px;
    height: 32px;
    margin: 0 0.5rem;
    border-radius: 50%;
    background-color: var(--color-white);
    transition: background-color 0.6s ease;
  }

  .pagenator__navitem:hover {
    background-color: var(--color-secondary);
  }

  .pagenator__navitem--active {
    background-color: var(--color-primary);
  }
`;
