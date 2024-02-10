import Link from "next/link";
import { FooterContainer } from "./styles";

export function Footer() {
  return (
    <footer>
      <FooterContainer>
        Desenvolvido por{" "}
        <Link target="_blank" href="https://github.com/RenanArantes/rdieta/">
          Renan Arantes
        </Link>
      </FooterContainer>
    </footer>
  );
}
