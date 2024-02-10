import styled from "styled-components";

export const FooterContainer = styled.header`
  position: relative;
  width: 100%;
  height: 75px;
  color: white;
  text-align: center;
  padding: 10px;

  margin-top: 33px;

  a {
    color: inherit; /* herda a cor do texto do elemento pai */
    text-decoration: none; /* remove o sublinhado */
    background-color: transparent; /* remove o background-color */
  }
`;
