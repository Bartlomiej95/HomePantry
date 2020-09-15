import { createGlobalStyle } from 'styled-components';

// @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500;562;700&display=swap');
// @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500;562;700&family=Pacifico&display=swap');
const GlobalStyle = createGlobalStyle`

   *, *::before, *::after {
    box-sizing: border-box;
  }
  *{
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 62.5%; 
  }

  body{
    padding-left: 12vw;
    
    @media(max-width: 374px){
      padding-left:0;
    }
  }

`;

export default GlobalStyle;
