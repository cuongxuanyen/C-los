import React from "react";
import {
  Controller,
  FieldValues,
  UseFormSetValue,
  UseFormTrigger,
  useWatch,
} from "react-hook-form";
import { Checkbox, Input, Radio, Tooltip } from "antd";
import TextArea from "antd/es/input/TextArea";
import { InfoCircleOutlined } from "@ant-design/icons";
import { ErrorMessage } from "@hookform/error-message";
import { useTranslation } from "react-i18next";
import { FormBox, LabelForm, Required, RequiredIcon } from "./FormField.styled";
import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
import { convertCharacter, convertRemoveIcon } from "@/common/function";

dayjs.extend(buddhistEra);

interface Props {
  props?: {
    placeholder?: string;
    disabled?: boolean;
    options?: any;
    mode?: "multiple";
    size?: "small" | "middle" | "large";
    allowClear?: boolean;
    maxLength?: number;
    onClick?: (e: any) => void;
    onBlur?: (e: any) => void;
    onFocus?: (e: any) => void;
    style?: any;
    suffixIcon?: any;
    readOnly?: boolean;
    type?: string;
    textalign?: "start" | "center" | "end";
    addonAfter?: string;
    showTime?: boolean;
    minwidth?: number;
    rowstextarea?: number;
    textcolor?: string;
    title?: any;
  };
  litmitCharacter?: {
    charToLimit?: string[];
    charLimit: number[];
  };
  label?: any;
  labelDisplayType?: "row" | "column";
  name: string;
  required?: boolean;
  control: any;
  render?: "checkbox" | "password" | "textarea" | "radio-group";
  options?: any;
  className?: string;
  errors?: any; // truyền vào khi input đó cần validate và hiện mess lỗi dưới input
  trigger?: UseFormTrigger<FieldValues>; // sử dụng để validate input khi click ra ngoài input, sử dụng khi input cần validate
  checked?: boolean;
  format?: any;
  exceptCharacters?: string; // khi isNoSpecCharater = true nhưng có 1 số kí tự vẫn được nhập thì sử dụng biến này
  isInvoice?: boolean; // form field có viền là nét đứt
  isInfor?: boolean; // true nếu label của form có icon infor
  inforMess?: string;
  isNoSpecCharater?: boolean; // true khi field đó không được nhập kí tự đặc biệt
  isNoSpace?: boolean; // true khi field đó không được nhập khoảng trắng
  isNotDefaultDatePicker?: boolean;
  disabledDate?: boolean; //true nếu muốn chọn ngày tương lai
  setValue?: UseFormSetValue<FieldValues>;
  onChange?: (e: any) => void; //render="select" thì không cần truyền onChange
  setJustifyContent?: string; //
  setRadioGroup?: boolean; //true nếu muốn chọn radio group theo chieu doc,
  setWidth?: string;
}

const FormField: React.FC<Props> = ({
  props,
  label,
  labelDisplayType,
  name,
  required,
  control,
  render,
  className,
  errors,
  checked,
  exceptCharacters,
  litmitCharacter,
  isInvoice,
  isInfor,
  inforMess,
  isNoSpecCharater,
  isNoSpace,
  trigger,
  setValue,
  onChange,
  setJustifyContent,
  setRadioGroup,
  setWidth,
}) => {
  const [t] = useTranslation("global");

  const watchField = useWatch({
    control,
    name: name,
  });

  const handleBlur = async (e: any) => {
    if (props?.onBlur) {
      props?.onBlur?.(e);
    } else if (!(render === "password")) {
      setValue?.(name, e.target.value.trim());
    }

    await trigger?.(name);
  };

  const handleChange = (e: any) => {
    onChange?.(e);
    if (isNoSpecCharater && isNoSpace) {
      const textRemoveIcon = convertCharacter(
        convertRemoveIcon(e?.target?.value),
        exceptCharacters,
        litmitCharacter?.charToLimit,
        litmitCharacter?.charLimit
      ).replace(" ", "");
      setValue?.(e?.target?.name, textRemoveIcon);
    } else if (isNoSpecCharater) {
      const textRemoveIcon = convertCharacter(
        convertRemoveIcon(e?.target?.value),
        exceptCharacters,
        litmitCharacter?.charToLimit,
        litmitCharacter?.charLimit
      );
      setValue?.(e?.target?.name, textRemoveIcon);
    } else if (isNoSpace) {
      const textRemoveIcon = convertRemoveIcon(e?.target?.value).replace(
        " ",
        ""
      );
      setValue?.(e?.target?.name, textRemoveIcon);
    } else {
      const textRemoveIcon = convertRemoveIcon(e?.target?.value);
      setValue?.(e?.target?.name, textRemoveIcon);
    }
  };

  const handleChangeCheckbox = (name: string) => {
    setValue?.(name, !watchField);
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
        borderBottom: "1px dashed black ",
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
    switch (render) {
      case "checkbox":
        return (
          <Checkbox
            {...field}
            {...props}
            checked={checked}
            style={{ pointerEvents: props?.readOnly ? "none" : "auto" }}
          />
        );
      case "password":
        return (
          <Input.Password
            {...field}
            {...props}
            autoComplete="new-password"
            onChange={handleChange}
            onBlur={handleBlur}
            style={{ pointerEvents: props?.readOnly ? "none" : "auto" }}
          />
        );
      case "textarea":
        return (
          <TextArea
            {...field}
            {...props}
            rows={props?.rowstextarea ? props?.rowstextarea : 1}
            readOnly={props?.readOnly}
            style={{
              ...borderStyle,
              fontSize: 16,
              borderRadius: isInvoice
                ? "unset"
                : props?.readOnly
                ? "unset"
                : "",
            }}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        );
      case "radio-group":
        return (
          <Radio.Group
            {...field}
            {...props}
            onChange={onChange}
            style={{
              pointerEvents: props?.readOnly ? "none" : "auto",
              display: setRadioGroup ? "contents" : "",
            }}
          />
        );
      default:
        return (
          <Input
            {...field}
            {...props}
            autoComplete="off"
            onBlur={handleBlur}
            onFocus={(e) => props?.onFocus?.(e)}
            onChange={handleChange}
            style={{
              ...borderStyle,
              height: 35,
              borderRadius: isInvoice
                ? "unset"
                : props?.readOnly
                ? "unset"
                : "",
              pointerEvents: props?.readOnly ? "none" : "auto",
              textAlign: props?.textalign,
              fontSize: 16,
              background: isInvoice || props?.readOnly ? "transparent" : "",
              color: props?.textcolor,
              fontFamily: "Montserrat",
            }}
          />
        );
    }
  };

  return (
    <div
      className={className}
      style={{
        marginTop: isInvoice ? 10 : 5,
        marginBottom: isInvoice ? 10 : 5,
        width: setWidth ? setWidth : "auto",
      }}
    >
      {render !== "checkbox" && (
        <>
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
        </>
      )}
      {render === "checkbox" && (
        <div
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
            justifyContent: setJustifyContent ? setJustifyContent : "",
          }}
        >
          <Controller
            name={name}
            control={control}
            rules={{ required: required || false }}
            render={({ field }) => handleRender(field)!}
          />
          <LabelForm
            style={{
              fontSize: 16,
              cursor:
                props?.readOnly || props?.disabled ? "not-allowed" : "pointer",
            }}
            onClick={
              props?.readOnly || props?.disabled
                ? () => {}
                : () => handleChangeCheckbox(name)
            }
          >
            {label} {required ? <Required>*</Required> : ""}
          </LabelForm>
          {errors && name && (
            <ErrorMessage
              errors={errors}
              name={name}
              message={`${label ? label : t("field")} ${t("required")}`}
              as={<Required />}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default FormField;
