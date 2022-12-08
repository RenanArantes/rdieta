import styled from 'styled-components'

export const Select = styled.select`
  border-radius: 6px;
  border: 0;
  background: ${(props) => props.theme.blueColors[900]};
  color: ${(props) => props.theme.blueColors[300]};
  padding: 0.5rem;

  font-size: 1.2rem;

  option {
    font-size: 1.1rem;
  }
`
