import { Dropdown, Input, Skeleton, Table } from "antd";
import React, { useEffect, useRef, useState } from "react";
import {
  Controller,
  FieldValues,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form";
import {
  FormBox,
  LabelForm,
  Required,
  RequiredIcon,
} from "../FormField/FormField.styled";
import { ErrorMessage } from "@hookform/error-message";
import { useTranslation } from "react-i18next";
import { DownOutlined } from "@ant-design/icons";
import "./input-drop.css";

const { TextArea } = Input;

interface Props {
  label?: any;
  labelDisplayType?: "row" | "column";
  name?: any;
  control?: any;
  required?: boolean;
  placeholder?: string;
  errors?: any;
  readOnly?: boolean;
  loading?: boolean;
  maxlength?: number;
  typeInput?: "textarea";
  title?: string;
  textalign?: "start" | "center" | "end";
  rowstextarea?: number;
  tableSearch?: {
    searchColumn?: any;
    isUnRowSelection?: any;
    rowSelectionType?: "checkbox";
    searchDataSource?: any;
    onRowClick?: (record: any, name: string) => void;
    onScroll?: (ref: any) => void;
  };
  setValue?: UseFormSetValue<FieldValues>;
  trigger?: UseFormTrigger<FieldValues>;
  onChange?: (e: any) => void;
}

const InputDropdown: React.FC<Props> = ({
  label,
  labelDisplayType,
  name,
  control,
  required,
  errors,
  placeholder,
  tableSearch,
  readOnly,
  loading,
  typeInput,
  maxlength,
  textalign,
  title,
  rowstextarea,
  trigger,
  setValue,
  onChange,
}) => {
  const [t] = useTranslation("global");
  const dropdownRef = useRef(null);
  const [dataSourceTable, setDataSourceTable] = useState([]);

  useEffect(() => {
    setDataSourceTable(tableSearch?.searchDataSource);
  }, [tableSearch?.searchDataSource]);

  const handleBlur = async (e: any) => {
    setValue?.(name, e.target.value.trim());
    await trigger?.(name);
  };

  const handleRowClick = (_: any, record: any) => {
    tableSearch?.onRowClick?.(record, name);
  };

  const handleScroll = () => {
    tableSearch?.onScroll?.(dropdownRef);
  };
  return (
    <div
      style={{
        marginTop: 10,
        marginBottom: 10,
      }}
    >
      <FormBox
        style={{ flexDirection: labelDisplayType ? labelDisplayType : "row" }}
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
          render={({ field }) => (
            <Dropdown
              dropdownRender={() =>
                !readOnly ? (
                  <div
                    ref={dropdownRef}
                    style={{
                      maxHeight: 300,
                      maxWidth: 1000,
                      overflowY: "auto",
                      boxShadow: "rgba(0, 0, 0, 0.25) 0px 4px 8px",
                      background: "white",
                    }}
                    onScroll={handleScroll}
                  >
                    {tableSearch?.isUnRowSelection ? (
                      <Table
                        columns={tableSearch?.searchColumn}
                        dataSource={dataSourceTable}
                        pagination={false}
                        size="middle"
                      />
                    ) : (
                      <Table
                        columns={tableSearch?.searchColumn}
                        dataSource={dataSourceTable}
                        pagination={false}
                        rowSelection={{
                          type: tableSearch?.rowSelectionType
                            ? tableSearch?.rowSelectionType
                            : "radio",
                          hideSelectAll: true,
                          onChange: handleRowClick,
                        }}
                        size="middle"
                      />
                    )}
                    {loading && dataSourceTable?.length > 5 ? (
                      <Skeleton
                        paragraph={{ rows: 1 }}
                        active
                        style={{ padding: 10 }}
                      />
                    ) : (
                      // <Skeleton.Input active block />
                      ""
                    )}
                    {/* </Spin> */}
                  </div>
                ) : (
                  ""
                )
              }
              trigger={["click"]}
            >
              {typeInput ? (
                <TextArea
                  {...field}
                  maxLength={maxlength}
                  rows={rowstextarea ? rowstextarea : 1}
                  onBlur={handleBlur}
                  onChange={onChange}
                  placeholder={placeholder}
                  readOnly={readOnly}
                  title={title}
                  style={{
                    borderBottom: readOnly
                      ? "1px inset #ABBED1"
                      : "1px dashed black",
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    borderRadius: "unset",
                    fontSize: 16,
                    background: "transparent",
                    textAlign: textalign,
                    fontFamily: "Montserrat",
                  }}
                />
              ) : (
                <Input
                  {...field}
                  autoComplete="off"
                  maxLength={maxlength}
                  onBlur={handleBlur}
                  onChange={onChange}
                  placeholder={placeholder}
                  title={title}
                  suffix={
                    readOnly ? (
                      ""
                    ) : (
                      <DownOutlined
                        style={{
                          fontSize: 12,
                          color: "rgba(0, 0, 0, 0.25)",
                        }}
                      />
                    )
                  }
                  style={{
                    borderBottom: readOnly
                      ? "1px inset #ABBED1"
                      : "1px dashed black",
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    borderRadius: "unset",
                    pointerEvents: readOnly ? "none" : "auto",
                    fontSize: 16,
                    background: "transparent",
                    textAlign: textalign,
                  }}
                />
              )}
            </Dropdown>
          )}
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

export default InputDropdown;
