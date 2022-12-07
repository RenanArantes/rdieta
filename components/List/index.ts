import styled from 'styled-components'

export const List = styled.ul`
  margin: 10px 0;
  list-style-type: none;

  li {
    margin: 5px 0;
  }

  li::before {
    content: '8';
    padding-right: 10px;
    font-family: 'Webdings';
    color: ${(props) => props.theme.blueColors[300]};
  }
`
