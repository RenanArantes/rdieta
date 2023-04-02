import styled from 'styled-components'

export const MacrosContainer = styled.div`
  ul {
    background-color: ${(props) => props.theme.blueColors[800]};
    margin: 8px;
    border-radius: 6px;
    border: 2px solid ${(props) => props.theme.blueColors[700]};

    &:hover {
      transition: 0.2s;
      background: ${(props) => props.theme.blueColors[700]};
      color: ${(props) => props.theme.white};
    }
  }
`
