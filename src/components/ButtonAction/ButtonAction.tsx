import { Button } from "antd";
import React from "react";
import styled from "styled-components";
interface Props {
  icon?: any;
  disabled?: boolean;
  onClick?: any;
  title?: string;
  backgroundShape?: "round" | "square" | "none";
  hoverColorIcon?: string;
}

const AcitonButton = styled(Button)<{
  hoverColorIcon?: string;
}>`
  width: 30px;
  height: 30px;
  border: 1px solid "#eff0f1" !important;
  &:hover {
    color: ${(props) => props.hoverColorIcon || "#15313c"} !important;
    background-color: "#eff0f1" !important;
    border: 1px solid ${(props) => props.hoverColorIcon || "#aaaaaa"} !important;
  }
`;

const ButtonAction: React.FC<Props> = ({
  icon,
  disabled,
  onClick,
  title,
  backgroundShape,
  hoverColorIcon,
}) => {
  const renderShape = () => {
    switch (backgroundShape) {
      case "round":
        return "50%";
      case "square":
        return "0%";
      default:
        return "";
    }
  };
  return (
    <AcitonButton
      style={{
        borderRadius: renderShape(),
        backgroundColor: backgroundShape === "none" ? "" : "#eff0f1",
      }}
      title={title}
      icon={icon}
      disabled={disabled}
      onClick={onClick}
      hoverColorIcon={hoverColorIcon}
    />
  );
};

export default ButtonAction;
