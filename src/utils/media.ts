import { css, ThemedCssFunction } from 'styled-components';

const sizes = {
  desktop: 992,
  tablet: 768,
  phone: 576,
};

// Iterate through the sizes and create a media template
// eslint-disable-next-line import/prefer-default-export
export const media = (Object.keys(sizes) as (keyof typeof sizes)[]).reduce((acc, label) => {
  acc[label] = (first: any, ...interpolations: any[]) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(first, ...interpolations)}
    }
  `;
  return acc;
}, {} as { [key in keyof typeof sizes]: ThemedCssFunction<any> });
