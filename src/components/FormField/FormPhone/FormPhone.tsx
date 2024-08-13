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
import { Input } from "antd";
import { ErrorMessage } from "@hookform/error-message";
import { useTranslation } from "react-i18next";
import {
  SelectInvoice,
  SelectInvoiceReadonly,
  SelectPhoneCode,
  SelectReadOnly,
} from "../FormSelect/FormSelect.styled";
import { useAppSelector } from "@/hooks";
import { convertRemoveIcon } from "@/common/function";
import { DownOutlined } from "@ant-design/icons";

interface Props {
  isInvoice?: boolean;
  label?: any;
  name: string;
  required?: boolean;
  control: any;
  errors?: any;
  labelDisplayType?: "row" | "column";
  props?: {
    placeholder?: string;
    disabled?: boolean;
    // options?: any;
    // mode?: "multiple";
    // size?: "small" | "middle" | "large";
    // allowClear?: boolean;
    maxLength?: number;
    onClick?: (e: any) => void;
    // onBlur?: (e: any) => void;
    // style?: any;
    // suffixIcon?: any;
    readOnly?: boolean;
    // textcolor?: string;
    // type?: string;
    // textalign?: "start" | "center" | "end";
    // addonAfter?: string;
    // showTime?: boolean;
  };
  onChange?: (e: any) => void;
  setValue: UseFormSetValue<FieldValues>;
  trigger?: UseFormTrigger<FieldValues>;
}

const FormPhone: React.FC<Props> = ({
  props,
  isInvoice,
  label,
  name,
  required,
  control,
  errors,
  labelDisplayType,
  onChange,
  setValue,
  trigger,
}) => {
  const [t] = useTranslation("global");
  const phoneCode: any = [];

  const malaysiaPhoneCode = "07f79577-b445-4ba9-befd-1c7c9924c885";

  const handleChange = (e: any) => {
    onChange?.(e);
    const textRemoveIcon = convertRemoveIcon(e?.target?.value).replace(
      /[^0-9.]/g,
      ""
    );
    setValue(e?.target?.name, textRemoveIcon);
  };
  const handleBlur = async (e: any) => {
    setValue(name, e.target.value.trim());
    await trigger?.(name);
  };

  const handleRenderSelectDia = (field: any) => {
    const commonProps = {
      ...field,
      ...props,
      placeholder: "Eg:+60",
      options: phoneCode,
      style: {
        width: "90px",
        marginRight: 10,
        height: 36,
      },
    };

    if (isInvoice) {
      if (props?.readOnly) {
        return (
          <SelectInvoiceReadonly
            {...commonProps}
            style={{
              ...commonProps.style,
              pointerEvents: "none",
            }}
            suffixIcon=""
          />
        );
      } else {
        return (
          <SelectInvoice
            {...commonProps}
            size="large"
            style={{
              ...commonProps.style,
              width: "90px",
              pointerEvents: "auto",
            }}
            suffixIcon={<DownOutlined style={{ pointerEvents: "none" }} />}
          />
        );
      }
    } else {
      if (props?.readOnly) {
        return (
          <SelectReadOnly
            {...commonProps}
            style={{
              ...commonProps.style,
              pointerEvents: "none",
            }}
            suffixIcon=""
          />
        );
      } else {
        return (
          <SelectPhoneCode
            {...commonProps}
            style={{
              ...commonProps.style,
              marginRight: 0,
            }}
            dropdownStyle={{ minWidth: 76 }}
          />
        );
      }
    }
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

  return (
    <div
      style={{
        marginTop: isInvoice ? 10 : 5,
        marginBottom: isInvoice ? 10 : 5,
        width: "100%",
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "-webkit-fill-available",
          }}
        >
          <Controller
            name={name + "Code"}
            control={control}
            defaultValue={
              phoneCode?.find((item: any) => item.value === malaysiaPhoneCode)
                ?.value
            }
            rules={{ required: required || false }}
            render={({ field }) => handleRenderSelectDia(field)!}
          />
          <Controller
            name={name}
            control={control}
            rules={{ required: required || false }}
            render={({ field }) => (
              <Input
                {...field}
                {...props}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{
                  // width: "-webkit-fill-available",
                  ...borderStyle,
                  borderRadius: isInvoice
                    ? "unset"
                    : props?.readOnly
                    ? "unset"
                    : "0 6px 6px 0px",
                  pointerEvents: props?.readOnly ? "none" : "auto",
                  fontSize: 16,
                  fontFamily: "Montserrat",
                }}
              />
            )}
          />
        </div>
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

export default FormPhone;
