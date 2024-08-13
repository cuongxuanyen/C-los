import React from "react";
import {
  Controller,
  FieldValues,
  UseFormSetValue,
  UseFormTrigger,
  useWatch,
} from "react-hook-form";
import { DatePicker } from "antd";
import { ErrorMessage } from "@hookform/error-message";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
import CalendarCustom from "@/components/Calendar/CalendarCustom";
import {
  FormBox,
  LabelForm,
  Required,
  RequiredIcon,
} from "../FormField.styled";

dayjs.extend(buddhistEra);

interface Props {
  props?: {
    placeholder?: string;
    onClick?: (e: any) => void;
    readOnly?: boolean;
    showTime?: boolean;
    inputReadOnly?: boolean;
  };
  label?: any;
  setValue?: UseFormSetValue<FieldValues>;
  trigger?: UseFormTrigger<FieldValues>;
  name: string;
  control: any;
  disabledFromDate?: any;
  disabledToDate?: any;
  required?: boolean;
  labelDisplayType?: "row" | "column";
  isNotDefaultDatePicker?: boolean;
  format?: any;
  isInvoice?: boolean; // form field có viền là nét đứt
  errors?: any; // truyền vào khi input đó cần validate và hiện mess lỗi dưới input
  disabledDate?: boolean; //true nếu muốn chọn ngày tương lai
}

const FormDate: React.FC<Props> = ({
  props,
  label,
  labelDisplayType,
  name,
  required,
  control,
  errors,
  isInvoice,
  isNotDefaultDatePicker,
  disabledDate,
  disabledFromDate,
  disabledToDate,
  format,
  setValue,
  trigger,
}) => {
  const [t] = useTranslation("global");
  const watchField = useWatch({
    control,
    name: name,
  });

  const disabledFutureTime = (current: any) => {
    const now = new Date();
    const currentDate = new Date(
      current.year(),
      current.month(),
      current.date()
    );

    const isCurrentDate = currentDate.getDate() === now.getDate();

    if (isCurrentDate) {
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentSecond = now.getSeconds();

      return {
        disabledHours: () => generateDisabledHours(currentHour),
        disabledMinutes: (selectedHour: any) =>
          generateDisabledMinutes(selectedHour, currentHour, currentMinute),
        disabledSeconds: (selectedHour: any, selectedMinute: any) =>
          generateDisabledSeconds(
            selectedHour,
            selectedMinute,
            currentHour,
            currentMinute,
            currentSecond
          ),
      };
    } else return false;
  };

  const generateDisabledHours = (currentHour: any) => {
    const hours = [];
    for (let hour = currentHour + 1; hour < 24; hour++) {
      hours.push(hour);
    }
    return hours;
  };
  const generateDisabledMinutes = (
    selectedHour: number,
    currentHour: number,
    currentMinute: number
  ) => {
    const minutes = [];
    if (selectedHour === currentHour) {
      for (let minute = currentMinute + 1; minute < 60; minute++) {
        minutes.push(minute);
      }
    }
    return minutes;
  };
  const generateDisabledSeconds = (
    selectedHour: number,
    selectedMinute: number,
    currentHour: number,
    currentMinute: number,
    currentSecond: number
  ) => {
    const seconds = [];
    if (selectedHour === currentHour && selectedMinute === currentMinute) {
      for (let second = currentSecond + 1; second < 60; second++) {
        seconds.push(second);
      }
    }
    return seconds;
  };

  const handleBlur = async () => {
    await trigger?.(name);
  };

  const getBorder = () => {
    if (props?.readOnly && isInvoice) {
      return {
        borderBottom: "1px inset #ABBED1",
        borderTop: "none",
        borderLeft: "none",
        borderRight: "none",
      };
    } else if (isInvoice || props?.readOnly) {
      return {
        borderBottom: "1px dashed black",
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
      <DatePicker
        {...field}
        {...props}
        onBlur={handleBlur}
        panelRender={
          isNotDefaultDatePicker
            ? ""
            : () => (
                <CalendarCustom
                  onChange={(e: any) => setValue?.(name, dayjs(e))}
                  disabledFromDate={disabledFromDate}
                  disabledToDate={disabledToDate}
                  disabledDate={disabledDate}
                  value={watchField}
                />
              )
        }
        disabledDate={(current: any) => {
          const date = new Date().getTime();
          const valueDate = new Date(current).getTime();
          return disabledDate ? !disabledDate : date < valueDate;
        }}
        disabledTime={disabledFutureTime}
        size={isInvoice ? "large" : "middle"}
        showNow={false}
        format={format ? format : "DD/MM/YYYY"}
        style={{
          ...borderStyle,
          width: "100%",
          borderRadius: isInvoice ? "unset" : props?.readOnly ? "unset" : "",
          pointerEvents: props?.readOnly ? "none" : "auto",
          fontSize: 16,
          height: 36,
          background: isInvoice ? "transparent" : "",
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

export default FormDate;
