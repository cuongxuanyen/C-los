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
import {
  SelectDefault,
  SelectInvoice,
  SelectInvoiceReadonly,
  SelectReadOnly,
} from "./FormSelect.styled";
import { DownOutlined } from "@ant-design/icons";

interface Props {
  props?: {
    placeholder?: string;
    disabled?: boolean;
    options: any;
    mode?: "multiple";
    // size?: "small" | "middle" | "large";
    allowClear?: boolean;
    // maxLength?: number;
    onClick?: (e: any) => void;
    onChange?: (e: any, name: string) => void;
    // style?: any;
    // suffixIcon?: any;
    readOnly?: boolean;
    // textcolor?: string;
    // type?: string;
    textalign?: "start" | "center" | "end";
    // addonAfter?: string;
    // showTime?: boolean;
  };
  isInvoice?: boolean;
  isStyleDropdown?: boolean;
  label?: any;
  labelDisplayType?: "row" | "column";
  name: string;
  required?: boolean;
  control: any;
  errors?: any;
  trigger?: UseFormTrigger<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  isSortFilter?: boolean;
}

const FormSelect: React.FC<Props> = ({
  props,
  isInvoice,
  label,
  labelDisplayType,
  name,
  required,
  control,
  errors,
  trigger,
  setValue,
  isStyleDropdown = false,
  isSortFilter = true,
}) => {
  const [t] = useTranslation("global");
  const handleBlur = async () => {
    await trigger?.(name);
  };
  const handleChange = (e: any) => {
    if (props?.onChange) {
      props?.onChange?.(e, name);
    } else {
      setValue(name, e);
    }
  };
  const handleRender = (field: any) => {
    const commonProps = {
      ...field,
      ...props,
      style: {
        width: "100%",
        pointerEvents: props?.readOnly ? "none" : "auto",
        minHeight: 35,
        textAlign: props?.textalign,
      },
      showSearch: true,
      optionFilterProp: "children",
      filterOption: (input: any, option: any) =>
        (option?.label ?? "").toLowerCase().includes(input.toLowerCase()),
      filterSort: (optionA: any, optionB: any) =>
        (optionA?.label ?? "")
          .toLowerCase()
          .localeCompare((optionB?.label ?? "").toLowerCase()),
      onBlur: handleBlur,
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
            allowClear
            dropdownStyle={isStyleDropdown ? { minWidth: 300 } : {}}
            onChange={handleChange}
            suffixIcon={
              props?.readOnly ? (
                ""
              ) : (
                <DownOutlined style={{ pointerEvents: "none" }} />
              )
            }
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
          <SelectDefault
            {...commonProps}
            allowClear
            dropdownStyle={isStyleDropdown ? { minWidth: 300 } : {}}
            onChange={handleChange}
            filterSort={(optionA: any, optionB: any) =>
              isSortFilter
                ? (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                : true
            }
          />
        );
      }
    }
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
            }}
          >
            {label} {required ? <RequiredIcon>* </RequiredIcon> : ""}
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

export default FormSelect;
