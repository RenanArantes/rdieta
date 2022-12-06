import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin: 15px 0;

  nav {
    display: flex;
    gap: 1rem;

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      color: ${(props) => props.theme.fonts.default};
      border-top: 3px solid transparent;
      border-bottom: 3px solid transparent;

      svg {
        margin-right: 5px;
      }

      &:hover {
        color: ${(props) => props.theme.fonts.title};
        border-bottom: 3px solid ${(props) => props.theme.fonts.title};
      }
    }
  }
`
export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    margin-left: 5px;
  }
`
