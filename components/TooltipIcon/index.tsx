import React from "react";
import { TooltipContainer, TooltipText } from "./styles";
import { Info } from "phosphor-react";

interface TooltipIconProps {
  tooltipText: string;
  size: number;
}

export function TooltipIcon({ tooltipText, size }: TooltipIconProps) {
  return (
    <TooltipContainer>
      <Info size={size} />
      <TooltipText>{tooltipText}</TooltipText>
    </TooltipContainer>
  );
}
