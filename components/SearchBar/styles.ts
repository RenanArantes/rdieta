import styled from 'styled-components'

export const FoodInputContainer = styled.div`
  margin-bottom: 15px;

  h2 {
    margin: 5px 0;
  }
`

export const CheckBoxContainer = styled.label`
  display: block;
  position: relative;
  padding-left: 5px;
  margin: 7px;
  cursor: pointer;
  font-size: 20px;

  &:hover {
    box-shadow: 0px 2px 0px 0px ${(props) => props.theme.blueColors[200]};

    span {
      background-color: ${(props) => props.theme.blueColors[400]};
      box-shadow: 0 0 0 2px ${(props) => props.theme.blueColors[200]};

      transition: 300ms;
    }

    transition: 300ms;
  }

  /* input:active ~ span {
    background-color: white;
  } */

  input:checked ~ span {
    background-color: ${(props) => props.theme.blueColors[300]};
  }

  input:checked ~ span:after {
    display: block;
  }

  span {
    margin-left: -5px;
    margin-top: 1.5px;
  }

  span:after {
    left: 5px;
    bottom: 4px;
    width: 6px;
    height: 11px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`

export const CheckBox = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: ${(props) => props.theme.blueColors[900]};
  border-radius: 6px;

  ::after {
    content: '';
    position: absolute;
    display: none;
  }
`

export const TextFood = styled.label`
  margin-left: 6px;
`
