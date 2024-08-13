import React from "react";
import {
  FormBox,
  LabelForm,
  Required,
  RequiredIcon,
} from "../FormField.styled";
import {
  Controller,
  FieldValues,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useTranslation } from "react-i18next";
import { Input } from "antd";
import { convertRemoveIcon } from "@/common/function";

interface Props {
  props?: {
    placeholder?: string;
    maxLength?: number;
    onClick?: (e: any) => void;
    readOnly?: boolean;
    disabled?: boolean;
  };
  label?: any;
  name: string;
  setValue?: UseFormSetValue<FieldValues>;
  onChange?: (e: any) => void; //render="select" thì không cần truyền onChange
  control: any;
  labelDisplayType?: "row" | "column";
  required?: boolean;
  trigger?: UseFormTrigger<FieldValues>; // sử dụng để validate input khi click ra ngoài input, sử dụng khi input cần validate
  errors?: any; // truyền vào khi input đó cần validate và hiện mess lỗi dưới input
  isInvoice?: boolean; // form field có viền là nét đứt
}

const FormEmail: React.FC<Props> = ({
  props,
  label,
  name,
  required,
  control,
  errors,
  isInvoice,
  labelDisplayType,
  trigger,
  setValue,
  onChange,
}) => {
  const [t] = useTranslation("global");

  const handleBlur = async (e: any) => {
    setValue?.(name, e.target.value.trim());
    await trigger?.(name);
  };

  const handleChange = (e: any) => {
    onChange?.(e);
    const textRemoveIcon = convertRemoveIcon(e?.target?.value);
    setValue?.(e?.target?.name, textRemoveIcon);
  };

  const getBorder = () => {
    if (props?.readOnly && isInvoice) {
      return {
        borderBottom: "1px inset #ABBED1",
        borderTop: "none",
        borderLeft: "none",
        borderRight: "none",
      };
    } else if (isInvoice) {
      return {
        borderBottom: "1px dashed black",
        borderTop: "none",
        borderLeft: "none",
        borderRight: "none",
      };
    } else if (props?.readOnly) {
      return {
        borderBottom: "1px inset #ABBED1",
        borderTop: "none",
        borderLeft: "none",
        borderRight: "none",
      };
    }
    return {};
  };

  const borderStyle = getBorder();

  const handleRender = (field: any) => {
    return (
      <Input
        {...field}
        {...props}
        onBlur={handleBlur}
        onChange={handleChange}
        style={{
          ...borderStyle,
          height: 35,
          borderRadius: isInvoice ? "unset" : props?.readOnly ? "unset" : "",
          pointerEvents: props?.readOnly ? "none" : "auto",
          fontSize: 16,
          background: isInvoice ? "transparent" : "",
          fontFamily: "Montserrat",
        }}
      />
    );
  };
  return (
    <div
      style={{
        marginTop: isInvoice ? 10 : 5,
        marginBottom: isInvoice ? 10 : 5,
      }}
    >
      <FormBox
        style={{
          flexDirection: labelDisplayType
            ? labelDisplayType
            : isInvoice
            ? "row"
            : "column",
        }}
      >
        {label && (
          <LabelForm style={{ fontSize: 16 }}>
            {label} {required ? <RequiredIcon>*</RequiredIcon> : ""}
          </LabelForm>
        )}
        <Controller
          name={name}
          control={control}
          rules={{
            required: required || false,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: t("errorEmail"),
            },
          }}
          render={({ field }) => handleRender(field)!}
        />
      </FormBox>
      {errors && name && (
        <ErrorMessage
          errors={errors}
          name={name}
          message={`${label ? label : t("field")} ${t("required")}`}
          as={<Required />}
        />
      )}
    </div>
  );
};

export default FormEmail;
