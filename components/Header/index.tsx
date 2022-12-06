import Image from 'next/image'
import Link from 'next/link'
import { HouseSimple, ForkKnife } from 'phosphor-react'
import logo from '../../assets/rdieta_logo.svg'
import { HeaderContainer, LogoContainer } from './styles'

export function Header() {
  return (
    <HeaderContainer>
      <LogoContainer>
        <Image src={logo.src} alt="Logo Rdeita" width={30} height={30} />
        <span>Rdieta</span>
      </LogoContainer>

      <nav>
        <Link href={'/'} title="Início">
          <HouseSimple size={24} />
          Home
        </Link>
        <Link href={'/diet'} title="Dieta">
          <ForkKnife size={24} />
          Dieta
        </Link>
      </nav>
    </HeaderContainer>
  )
}
