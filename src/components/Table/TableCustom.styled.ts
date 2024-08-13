import { Table } from "antd";
import styled from "styled-components";

export const TableFooter = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "end",
  margin: "16px",
});

export const TotalLabel = styled.span({
  marginRight: "10px",
});

export const TableCustoms = styled(Table)`
  .ant-table-cell {
    border-bottom: 1px solid #abbed1 !important;
  }
  .ant-table {
    background-color: transparent !important;
  }
  th {
    background-color: rgba(0,170,172,.9) !important;
    color: #FFF !important;
  }
`;
