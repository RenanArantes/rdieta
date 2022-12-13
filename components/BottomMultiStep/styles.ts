import styled from 'styled-components'

export const MultiStepContainer = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;

  border-radius: 6px 6px 0 0;
  width: 100%;
  height: 60px;

  background: ${(props) => props.theme.blueColors[700]};
`
export const Label = styled.div`
  color: ${(props) => props.theme.fonts.default};

  text-align: center;

  h2 {
    margin: 5px 0;
  }
`
interface StepsProps {
  steps: number
}

export const Steps = styled.div<StepsProps>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.steps}, 1fr);
  gap: 12px;

  margin: 5px 15px;
`
interface StepProps {
  active: boolean
}

export const Step = styled.div<StepProps>`
  height: 10px;
  border-radius: 999px;
  background-color: ${(props) =>
    props.active ? props.theme.blueColors[300] : props.theme.blueColors[900]};

  &:hover {
    background-color: ${(props) =>
      props.active ? props.theme.blueColors[200] : props.theme.blueColors[900]};
  }
`
