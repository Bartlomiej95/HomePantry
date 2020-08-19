import React from 'react';
import styled from 'styled-components';

export const UlElementList = styled.ul`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  margin-top: 20px;
`;

export const LiElementList = styled.li`
  position: relative;
  list-style-type: decimal;
  list-style-position: inside;
  font-size: ${({ theme }) => theme.fontSize.normal};
  padding: 0 auto 10px auto;
  margin: 0 auto;
  width: 70vw;
  height: 40px;
  line-height: 40px;
`;
