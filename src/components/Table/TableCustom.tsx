import React from "react";
import { columnProps } from "./TableCustom.types";
import { TableCustoms, TableFooter } from "./TableCustom.styled";
import "./table-cutom.css";
import Pagination from "../Pagination/Pagination";

const TableCustom: React.FC<columnProps> = ({
  columns,
  dataSource,
  onRow,
  rowSelection,
  currentPage,
  total,
  isNotDisplayFooter,
  onChangePage,
  scrollValuex,
  scrollValuey,
  pageSizeOptions,
  pageSizeProps,
}) => {
  return (
    <>
      <TableCustoms
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        onRow={onRow}
        rowSelection={rowSelection}
        className="custom-table"
        size="small"
        bordered
        style={{ width: "100%" }}
        scroll={{
          x: scrollValuex ? scrollValuex : undefined,
          y: scrollValuey ? scrollValuey : undefined,
        }}
      />
      {isNotDisplayFooter ? (
        ""
      ) : (
        <TableFooter>
          <Pagination
            currentPage={currentPage}
            total={total}
            onChangePage={onChangePage}
            pageSizeOptions={pageSizeOptions}
            pageSizeProps={pageSizeProps}
          />
        </TableFooter>
      )}
    </>
  );
};

export default TableCustom;
