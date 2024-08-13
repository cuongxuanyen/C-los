import React from "react";
import { Input } from "antd";

interface CustomInputProps {
  type?: "textarea" | "number" | "input" | "file";
  value?: any;
  placeholder?: string;
  allowClear?: boolean;
  disabled?: boolean;
  onChange?: any;
  status?: boolean;
  style?: React.CSSProperties;
  prefix?: any;
  onPressEnter?: () => void;
  maxLength?: number;
  accept?: ".xlsx";
  onBlur?: (e: any) => void;
  onPaste?: (e: any) => void;
}

const InputCustom: React.FC<CustomInputProps> = ({
  prefix,
  value,
  allowClear,
  placeholder,
  type,
  onChange,
  onPressEnter,
  status = true,
  disabled,
  style,
  accept,
  maxLength,
  onBlur,
  onPaste,
}) => {
  return (
    <Input
      type={type}
      value={value}
      style={{ ...style, height: 37 }}
      placeholder={placeholder}
      allowClear={allowClear}
      onChange={onChange}
      status={status ? "" : "error"}
      disabled={disabled}
      accept={accept}
      onPressEnter={onPressEnter}
      maxLength={maxLength}
      onBlur={onBlur}
      onPaste={onPaste}
      prefix={prefix}
    />
  );
};

export default InputCustom;
