import { Select } from "antd";
import styled from "styled-components";

export const SelectInvoice = styled(Select)`
  .ant-select-selector {
    border-bottom: 1px dashed black !important;
    border-top: none !important;
    border-left: none !important;
    border-right: none !important;
    border-radius: unset !important;
  }
  .ant-select-selection-item {
    font-size: 16px;
  }
  .ant-select-selection-placeholder {
    font-size: 16px;
    white-space: pre-wrap !important;
    text-overflow: ellipsis !important;
  }
`;

export const SelectInvoiceReadonly = styled(Select)`
  .ant-select-selector {
    border-bottom: 1px inset #abbed1 !important;
    border-top: none !important;
    border-left: none !important;
    border-right: none !important;
    border-radius: unset !important;
  }
  .ant-select-selection-item {
    font-size: 16px;
  }
  .ant-select-selection-placeholder {
    font-size: 16px;
    white-space: pre-wrap !important;
    text-overflow: ellipsis !important;
  }
`;

export const SelectDefault = styled(Select)`
  .ant-select-selection-item {
    font-size: 16px;
  }
  .ant-select-selection-placeholder {
    font-size: 16px;
  }
  .ant-select-selector {
    min-height: 35px;
  }
`;

export const SelectReadOnly = styled(Select)`
  .ant-select-selector {
    border-bottom: 1px inset #abbed1 !important;
    border-top: none !important;
    border-left: none !important;
    border-right: none !important;
    border-radius: unset !important;
  }
  .ant-select-selection-item {
    font-size: 16px;
  }
  .ant-select-selection-placeholder {
    font-size: 16px;
  }
  .ant-select-selection-overflow {
    padding-bottom: 4px;
  }
`;

export const SelectPhoneCode = styled(Select)`
  .ant-select-selection-item {
    font-size: 16px;
  }
  .ant-select-selection-placeholder {
    font-size: 16px;
  }
  .ant-select-selector {
    min-height: 35px;
    border-radius: 6px 0 0 6px;
    border: none !important;
    border-bottom: 1px solid #d9d9d9 !important;
    border-left: 1px solid #d9d9d9 !important;
    border-top: 1px solid #d9d9d9 !important;
  }
`;
