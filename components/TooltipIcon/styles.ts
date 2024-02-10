import styled from "styled-components";

export const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
  align-self: "center";

  &:hover {
    span {
      visibility: visible;
      opacity: 1;
    }
  }

  vertical-align: "middle";
  margin-top: 8px;
  margin-left: 5px;
  cursor: help;
`;

export const TooltipText = styled.span`
  visibility: hidden;
  width: 222px;
  background-color: ${(props) => props.theme.blueColors[700]};
  color: ${(props) => props.theme.white};
  text-align: center;
  padding: 5px;
  border-radius: 6px;

  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;

  opacity: 0;
  transition: opacity 0.3s;
`;
