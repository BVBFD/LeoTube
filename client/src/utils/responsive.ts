import { CSSProp, css } from 'styled-components';

export const mobile = (width: number, props: CSSProp) => {
  switch (width) {
    case 1300:
      return css`
        @media screen and (max-width: 1300px) {
          ${props}
        }
      `;

    case 800:
      return css`
        @media screen and (max-width: 800px) {
          ${props}
        }
      `;

    case 500:
      return css`
        @media screen and (max-width: 500px) {
          ${props}
        }
      `;

    default:
      return;
  }
};
