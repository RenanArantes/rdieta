import styled from 'styled-components'
import spinner from '../../../assets/spinner.png'

export const FormContainer = styled.div`
  margin: 0 auto;
  width: 50%;

  form {
    display: flex;
    flex-direction: column;
    margin: 20px 0px;
  }

  @media (max-width: 400px) {
    width: 100%;
  }

  padding: 6px;

  background-color: transparent;
  border: 2px solid ${(props) => props.theme.blueColors[400]};
  border-radius: 6px;

  span {
    margin: 5px 10%;

    label {
      margin-right: 3px;
    }
  }

  input {
    width: 50%;
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
    width: 50%;
  }
`
