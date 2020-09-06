import styled, { css } from 'styled-components';

export const Paragraph = styled.p`
  font-size: ${({ theme }) => theme.fontSize.normal};
  text-align: center;

  ${({ isVisible }) =>
    isVisible &&
    css`
      opacity: 0.1;
    `}
`;

export const ParagraphLimit = styled.p`
  font-size: ${({ theme }) => theme.fontSize.medium};

  @media (max-width: 600px) {
    display: none;
  }
`;

export const ParagraphLimitAmount = styled.p`
  font-size: ${({ theme }) => theme.fontSize.medium};
`;
