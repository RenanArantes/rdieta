import roundedDivision from './roundedDivision'

const getTotalKcal = (cho: number, ptn: number, lip: number) => {
  return roundedDivision(cho * 4 + ptn * 4 + lip * 9)
}

export default getTotalKcal
