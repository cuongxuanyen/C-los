import { Input, Tooltip } from "antd";
import React from "react";
import {
  FormBox,
  LabelForm,
  Required,
  RequiredIcon,
} from "../FormField.styled";
import { InfoCircleOutlined } from "@ant-design/icons";
import {
  Controller,
  FieldValues,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useTranslation } from "react-i18next";
import { convertRemoveIcon, formatCurrency } from "@/common/function";
import { InputInvoiceReadOnly } from "./FormInputNumber.styled";

interface Props {
  props?: {
    placeholder?: string;
    onClick?: (e: any) => void;
    maxLength?: number;
    readOnly?: boolean;
    textalign?: "start" | "center" | "end";
    minwidth?: number;
    addonAfter?: string;
    size?: "small" | "middle" | "large";
    textcolor?: string;
  };
  label?: any;
  name: string;
  control: any;
  onChange?: (e: any) => void; //render="select" thì không cần truyền onChange
  setValue?: UseFormSetValue<FieldValues>;
  required?: boolean;
  errors?: any; // truyền vào khi input đó cần validate và hiện mess lỗi dưới input
  trigger?: UseFormTrigger<FieldValues>; // sử dụng để validate input khi click ra ngoài input, sử dụng khi input cần validate
  isMoneyConvert?: boolean;
  isInvoice?: boolean; // form field có viền là nét đứt
  labelDisplayType?: "row" | "column";
  isInfor?: boolean; // true nếu label của form có icon infor
  inforMess?: string;
  isCanFloat?: boolean;
}

const FormInputNumber: React.FC<Props> = ({
  props,
  label,
  labelDisplayType,
  name,
  required,
  control,
  errors,
  isInvoice,
  isInfor,
  inforMess,
  isMoneyConvert,
  trigger,
  setValue,
  onChange,
  isCanFloat,
}) => {
  const [t] = useTranslation("global");

  const handleBlur = async () => {
    await trigger?.(name);
  };

  const onChangeInputNmber = (e: any) => {
    onChange?.(e);
    const inputValue = e?.target?.value;
    const valueRemoveIcon = convertRemoveIcon(inputValue);
    const valueOnlyNumber = isCanFloat
      ? valueRemoveIcon.replace(/[^0-9.]/g, "")
      : valueRemoveIcon.replace(/[^0-9.]/g, "").replace(/^0+/, "");
    const textRemoveIcon = isMoneyConvert
      ? formatCurrency(valueOnlyNumber)
      : valueOnlyNumber;
    setValue?.(e?.target?.name, textRemoveIcon);
  };

  const getBorder = () => {
    if (isInvoice && props?.readOnly) {
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

  const commonStyle = {
    ...borderStyle,
    height: 35,
    borderRadius: isInvoice || props?.readOnly ? "unset" : "",
    pointerEvents: props?.readOnly ? "none" : "auto",
    textAlign: props?.textalign,
    fontSize: 16,
    background: isInvoice || props?.readOnly ? "transparent" : "",
    color: props?.textcolor,
    fontFamily: "Montserrat",
  };

  const handleRender = (field: any) => {
    const Component = props?.readOnly ? InputInvoiceReadOnly : Input;
    return (
      <Component
        {...field}
        {...props}
        onBlur={handleBlur}
        onChange={onChangeInputNmber}
        style={commonStyle}
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
          <LabelForm
            style={{
              fontSize: 16,
              minWidth: props?.minwidth,
              color: props?.textcolor,
            }}
          >
            {label}{" "}
            {required && isInfor ? (
              <RequiredIcon>(*) </RequiredIcon>
            ) : required ? (
              <RequiredIcon>* </RequiredIcon>
            ) : (
              ""
            )}
            {isInfor && (
              <Tooltip title={inforMess}>
                <InfoCircleOutlined width={17} height={17} />
              </Tooltip>
            )}
          </LabelForm>
        )}
        <Controller
          name={name}
          control={control}
          rules={{
            required: required || false,
          }}
          render={({ field }) => handleRender(field)!}
        />
      </FormBox>
      {errors && name && (
        <ErrorMessage
          errors={errors}
          name={name}
          message={`${
            typeof label === "string" && label
              ? label
              : label?.props?.children
              ? label?.props?.children
              : t("field")
          } ${t("required")}`}
          as={<Required />}
        />
      )}
    </div>
  );
};

export default FormInputNumber;
