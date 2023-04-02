import styled from 'styled-components'

export const Button = styled.button`
  height: 50px;
  border: 1px solid ${(props) => props.theme.white};
  background: ${(props) => props.theme.blueColors[400]};
  color: ${(props) => props.theme.white};
  font-weight: bold;
  padding: 0 1.25rem;
  border-radius: 6px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transition: 0.4s;
    background: ${(props) => props.theme.blueColors[300]};
    color: ${(props) => props.theme.blueColors[700]};

    border: 1px solid ${(props) => props.theme.blueColors[400]};
  }

  &:disabled {
    display: none;
  }
`
