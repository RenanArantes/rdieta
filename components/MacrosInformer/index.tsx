import { List } from '../List'
import { Subtitle } from '../Subtitle'
import { MacrosContainer } from './styles'

interface Macros {
  cho: number
  ptn: number
  lip: number
  kcal: number
}

interface MacrosInformerData {
  macrosData: Macros
}

export default function MacrosInformer({ macrosData }: MacrosInformerData) {
  return (
    <MacrosContainer>
      <div>
        <Subtitle>Valores totais de todas as refeições</Subtitle>
        <List>
          <li>
            CHO: <strong>{macrosData.cho}</strong>g
          </li>
          <li>
            PTN: <strong>{macrosData.ptn}</strong>g
          </li>
          <li>
            LIP: <strong>{macrosData.lip}</strong>g
          </li>
          <li>
            Total: <strong>{macrosData.kcal}</strong> kcal
          </li>
        </List>
      </div>
    </MacrosContainer>
  )
}
