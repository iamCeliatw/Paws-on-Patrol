import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family:'Roboto', sans-serif;
    /* font-family: 'Roboto Serif', serif; */
}
body {
    background:${({ theme }) => theme.colors.body};    
    }
`;
export default GlobalStyles;
