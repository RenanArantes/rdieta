import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :focus {
    outline: 0;
    box-shadow: 0 0 0 2px ${(props) => props.theme.blueColors[200]};
  }

  body {
    min-height: 100vh;
    //min-width: 400px;

    background: ${(props) => props.theme.blueColors[900]};
    color: ${(props) => props.theme.fonts.default}
  }

  body, input, button, select {
    font-family: 'Rubik', sans-serif;
    font-weight: 400;
    font-size: 1rem;
  }
`
