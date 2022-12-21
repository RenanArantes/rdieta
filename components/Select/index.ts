import styled from 'styled-components'

export const Select = styled.select`
  border-radius: 6px;
  border: 1px solid ${(props) => props.theme.blueColors[700]};
  background: ${(props) => props.theme.blueColors[900]};
  color: ${(props) => props.theme.blueColors[300]};
  padding: 0.5rem;

  font-size: 1.2rem;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url("data:image/svg+xml;utf8,<svg fill='%236a99c3' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
  background-repeat: no-repeat;
  background-position-x: 100%;
  background-position-y: -3px;

  option {
    font-size: 1.1rem;
    color: ${(props) => props.theme.blueColors[300]};
  }

  option[value=''][disabled] {
    display: none;
  }

  &:required:invalid {
    color: ${(props) => props.theme.blueColors[700]};
  }

  &:hover {
    border: 1px solid ${(props) => props.theme.blueColors[400]};

    &::placeholder {
      color: ${(props) => props.theme.blueColors[400]};
    }
  }
`
