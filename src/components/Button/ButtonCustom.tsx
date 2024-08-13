import React from "react";
import { Button, ButtonProps } from "antd";

interface CustomButtonProps extends ButtonProps {
  colorButton?: string; // Màu của button
  colorText?: string; // Màu của text
  icon?: React.ReactNode; // Icon của button;
  text?: string; //Text button
  type?: "primary" | "dashed" | "text" | "link";
  disabled?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
  loading?: boolean;
}

const ButtonCustom: React.FC<CustomButtonProps> = ({
  colorButton,
  colorText,
  style,
  icon,
  text,
  type,
  disabled,
  onClick,
  loading,
}) => {
  return (
    <Button
      type={type}
      style={{
        ...style,
        backgroundColor: disabled
          ? "grey"
          : colorButton
          ? colorButton
          : "#34BFA3",
        color: colorText ? colorText : "#ffffff",
      }}
      icon={icon ? icon : ""}
      onClick={onClick}
      disabled={disabled}
      loading={loading}
    >
      {text}
    </Button>
  );
};

export default ButtonCustom;
