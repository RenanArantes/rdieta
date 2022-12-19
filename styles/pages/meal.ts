import styled from 'styled-components'

export const DietContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin: 0 auto;
  width: 90%;
`

export const MealContainer = styled.div``

export const MealListContainer = styled.div`
  background-color: transparent;
  border: 2px solid ${(props) => props.theme.blueColors[400]};
  border-radius: 6px;

  padding: 10px;

  margin: 20px 0;
`

export const MealHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  margin: 15px 0px;

  @media (max-width: 500px) {
    display: flex;

    h1,
    button {
      scale: 0.8;
    }
  }
`

export const MealFunctionsContainer = styled.div`
  display: flex;
  margin: 0 10px;

  button {
    height: 35px;

    svg {
      margin-right: 5px;
    }

    @media (max-width: 600px) {
      span {
        display: none;
      }
    }
  }
`
export const MealInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 650px) {
    display: flex;
    flex-direction: column;

    margin: 0 15px;
  }

  ul {
    margin: 8px;
    border-radius: 6px;
    border: 2px solid ${(props) => props.theme.blueColors[700]};

    &:hover {
      transition: 0.2s;
      background: ${(props) => props.theme.blueColors[700]};
      color: ${(props) => props.theme.white};
    }
  }
`
export const MacrosContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
