import styled from 'styled-components'

export const FormContainer = styled.div`
  /* width: 50%;

  padding: 6px;

  background-color: ${(props) => props.theme.blueColors[800]};
  border: 2px solid ${(props) => props.theme.blueColors[400]};
  border-radius: 6px; */

  form {
    display: flex;
    flex-direction: column;

    margin: 0 auto;
    span {
      display: flex;
      flex-direction: column;

      label {
        display: inline-block;
        margin-bottom: 4px;
      }

      &:hover {
        color: ${(props) => props.theme.white};
      }
    }
  }

  @media (max-width: 500px) {
    width: 100%;
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
`
