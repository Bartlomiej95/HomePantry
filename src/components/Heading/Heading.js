import styled, { css } from 'styled-components';

export const Heading = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  text-align: center;
  text-transform: uppercase;

  ${({ isVisible }) =>
    isVisible &&
    css`
      opacity: 0.1;
    `};

  @media (max-width: 374px) {
    font-size: ${({ theme }) => theme.fontSize.normal};
  }

  @media (max-width: 768px) and (min-width: 375px) {
    font-size: ${({ theme }) => theme.fontSize.large};
  }
`;

export const SubHeading = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.normal};
`;

export const CategoryHeading = styled.h2`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.large};

  &::first-letter {
    text-transform: uppercase;
  }

  @media (max-width: 368px) {
    font-size: ${({ theme }) => theme.fontSize.normal};
  }

  @media (max-width: 768px) and (min-width: 365px) {
    font-size: ${({ theme }) => theme.fontSize.medium};
  }
`;
