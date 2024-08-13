export type filterData = {
  text: string;
  value: string;
};

export type columnItem = {
  key: string;
  title: string;
  dataIndex: string;
  sorter?: object; // TODO use sorter number:   sorter:  (a, b) => a.dataIndex - b.dataIndex    |    TODO use sorter text: sorter:  (a, b) => a.dataIndex.length - b.dataIndex.length
  onFilter?: any; //TODO use :    onFilter: (value, record) => record.dataIndex.startsWith(value)
  filterSearch?: boolean;
  filters?: filterData[]; //TODO use :      dataSource.map((item) => ({text: item.address, value: item.address}))
};

export type columnProps =
  | {
      [x: string]: any;
      columns: columnItem[]; //TODO use:  import { TableColumnsType } from "antd"; || import { columnProps } from "./TableCustom.types";  || const columns:TableColumnsType<columnProps>
      dataSource: any;
      onRow?: any; //TODO use
      rowSelection?: any;
      currentPage?: any;
      total?: any;
      isNotDisplayFooter?: boolean;
      onChangePage?: () => void;
      pageSizeOptions?: number[];
      pageSizeProps?: number;
    }
  | any;
