import styled from 'styled-components'

export const Input = styled.input`
  border-radius: 6px;
  border: 0;
  background: ${(props) => props.theme.blueColors[900]};
  color: ${(props) => props.theme.blueColors[300]};
  padding: 0.5rem;

  &::placeholder {
    color: ${(props) => props.theme.blueColors[700]};
  }
`
