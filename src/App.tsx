import React from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';

import { DefaultThemeOnestino, defaultBodyCss } from '@m2stack/ui.onestino';

import Creator from './articlecreator';

const Bold = './../public/fonts/HKGrotesk-Bold.otf';
const Medium = './../public/fonts/HKGrotesk-Medium.otf';
const Semi = './../public/fonts/HKGrotesk-SemiBold.otf';

const GlobalStyle = createGlobalStyle`
  ${defaultBodyCss(Bold, Medium, Semi)}
`


const StyledPageContainer = styled.div`

    width:100%;
    position:relative;
    text-rendering: optimizelegibility;
    -webkit-font-smoothing: antialiased;
    display: flex;
    justify-content: center;
    padding-top: 20px;

`;


const App: React.FC = () => {
  return (
    <ThemeProvider theme={DefaultThemeOnestino}>
      <GlobalStyle />
      <StyledPageContainer>
        <Creator />
      </StyledPageContainer>
    </ThemeProvider>
  )
}

export default App;
