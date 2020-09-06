//ogólny szablon dzieki, któremu podłączymy globalne style do całego projektu
import React from 'react';
import GlobalStyle from '../theme/GlobalStyle';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { theme, device } from '../theme/mainTheme';

const MainTemplate = ({ children }) => {
  return (
    <div>
      <GlobalStyle />
      <ThemeProvider theme={theme} device={device}>
        {children}
      </ThemeProvider>
    </div>
  );
};

MainTemplate.propTypes = {
  children: PropTypes.element.isRequired,
};

export default MainTemplate;
