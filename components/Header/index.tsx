import Image from "next/image";
import Link from "next/link";
import { HouseSimple, ForkKnife, CookingPot } from "phosphor-react";
import logo from "../../assets/rdieta_logo.svg";
import { Title } from "../Title";
import { HeaderContainer, LogoContainer } from "./styles";

export function Header() {
  return (
    <HeaderContainer>
      <LogoContainer>
        <Image src={logo.src} alt="Logo Rdeita" width={40} height={40} />
        <Title>Rdieta</Title>
      </LogoContainer>

      <nav>
        <Link href={"/"} title="Início">
          <HouseSimple size={24} />
          Home
        </Link>
        <Link href={"/meal"} title="Refeição">
          <ForkKnife size={24} />
          Refeição
        </Link>
        <Link href={"/foods"} title="Comidas">
          <CookingPot size={24} />
          Comidas
        </Link>
      </nav>
    </HeaderContainer>
  );
}
