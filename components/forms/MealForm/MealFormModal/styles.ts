import styled from 'styled-components'
import spinner from '../../../../assets/spinner.png'

export const FormContainer = styled.div`
  margin: auto;
  margin-top: 50px;

  overflow: auto;

  max-width: 60%;
  height: 85%;

  padding: 6px;

  background-color: ${(props) => props.theme.blueColors[700]};
  border: 2px solid ${(props) => props.theme.blueColors[400]};
  border-radius: 6px;

  input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    cursor: pointer;
    display: block;
    width: 20px;
    color: '#333';
    text-align: center;
    position: relative;
  }

  input[type='number']:hover::-webkit-inner-spin-button {
    background: transparent url(${spinner.src}) no-repeat 50% 50%;
    width: 14px;
    height: 14px;
    padding: 4px;
    position: relative;
    right: 4px;
    border-radius: 28px;
  }

  select {
    max-width: 320px;

    margin-bottom: 20px;
  }

  @media (max-width: 1240px) {
    min-width: 85%;
  }

  @media (max-width: 720px) {
    span {
      display: flex;
      flex-direction: column;
    }
  }
`

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;

  align-items: center;

  margin: 20px;

  svg:hover {
    transition: 300ms;

    color: ${(props) => props.theme.fonts.title};
  }
`

export const CloseIconContainer = styled.span`
  color: ${(props) => props.theme.fonts.default};
  float: right;
  font-size: 28px;
  cursor: pointer;
`

export const MealInputContainer = styled.div`
  display: flex;
  margin-left: 20px;

  align-items: center;

  input[type='text'] {
    font-size: 18px;
  }
`

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 1390px) {
    flex-direction: column;
  }

  input[type='checkbox'] {
    visibility: hidden;
  }
`
export const FoodListContainer = styled.div`
  margin: 20px;
  width: 100%;

  @media (max-width: 1390px) {
    margin: 20px 0px;
  }
`

export const SelectedFoodContainer = styled.div`
  margin: 20px;
  width: 100%;

  @media (max-width: 1390px) {
    margin: 20px 0px;
  }

  input[type='number'] {
    min-width: 80px;
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
