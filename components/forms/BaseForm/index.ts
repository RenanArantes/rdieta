import styled from 'styled-components'

export const BaseForm = styled.div`
  padding-bottom: 20px;

  form {
    width: 85%;
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
