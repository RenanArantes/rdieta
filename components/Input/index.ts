import styled from 'styled-components'
import arrow from '../../assets/arrowupdown.png'

export const Input = styled.input`
  border-radius: 6px;
  border: 1px solid ${(props) => props.theme.blueColors[700]};
  background: ${(props) => props.theme.blueColors[900]};
  color: ${(props) => props.theme.blueColors[300]};
  padding: 0.5rem;

  &::placeholder {
    color: ${(props) => props.theme.blueColors[700]};
  }

  &:hover {
    border: 1px solid ${(props) => props.theme.blueColors[400]};

    &::placeholder {
      color: ${(props) => props.theme.blueColors[400]};
    }
  }

  &&[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    cursor: pointer;
    display: block;
    width: 8px;
    color: '#333';
    text-align: center;
    position: relative;
  }

  &&[type='number']:hover::-webkit-inner-spin-button {
    background: transparent url(${arrow.src}) no-repeat 50% 50%;
    width: 14px;
    height: 14px;
    padding: 4px;
    position: relative;
    right: 4px;
    border-radius: 28px;
  }
`
