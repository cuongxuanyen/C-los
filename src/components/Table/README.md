<!-- import React from "react";
import TableCustom from "../../components/Table/TableCustom";
import { TableColumnsType } from "antd";
import { columnProps } from "../../components/Table/TableCustom.types";

const PageDemo: React.FC = () => {
  const dataSource = [
    {
      key: "1",
      name: "name1",
      city: "HN",
    },
    {
      key: "2",
      name: "",
      city: "SG",
    },
    {
      key: "3",
      name: "name3",
      city: "N/A",
    },
  ];

  const columns: TableColumnsType<columnProps> = [
    {
      key: "name",
      title: "name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      key: "city",
      title: "city",
      dataIndex: "city",
      filterSearch: true,
      filters: dataSource.map((item) => ({
        text: item.city,
        value: item.city,
      })),
      onFilter: (value, record) => record.city.indexOf(value) === 0,
    },
  ];

  return (
    <>
      <TableCustom columns={columns} dataSource={dataSource} />
    </>
  );
};

export default PageDemo; -->
