import styled from 'styled-components'

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const DataContainer = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;

  align-items: center;

  @media (max-width: 550px) {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    h1 {
      text-align: justify;
    }

    button {
      label {
        display: none;
      }
    }
  }
`

export const FormContainer = styled.div`
  margin: 10px 0;
`
