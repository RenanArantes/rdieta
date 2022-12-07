import styled from 'styled-components'
import spinner from '../../../../assets/spinner.png'

export const FormContainer = styled.div`
  margin: auto;
  margin-top: 50px;

  overflow: auto;

  width: 50%;
  height: 85%;

  padding: 6px;

  background-color: ${(props) => props.theme.blueColors[700]};
  border: 2px solid ${(props) => props.theme.blueColors[400]};
  border-radius: 6px;

  form {
    display: flex;
    flex-direction: column;
    margin: 20px 0px;
  }

  span {
    margin: 5px 10%;

    label {
      margin-right: 3px;
    }
  }

  button {
    margin: 0 auto;
    margin-top: 10px;
    width: 80%;
  }

  input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    cursor: pointer;
    display: block;
    width: 8px;
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
    min-width: 50%;
  }

  @media (max-width: 500px) {
    width: 90%;

    span {
      display: flex;
      flex-direction: column;
    }

    input {
      width: 100%;
    }
  }
`

export const CloseIconContainer = styled.span`
  color: ${(props) => props.theme.fonts.default};
  float: right;
  font-size: 28px;
  cursor: pointer;
`
export const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 1390px) {
    flex-direction: column;
  }
`
