import React, { useEffect, useState } from "react";
import { Select } from "antd";

interface CustomSelectProps {
  style?: React.CSSProperties;
  placeholder?: string | "";
  select?: Array<any>;
  allowClear?: boolean;
  isSearch?: boolean;
  status?: "" | "error" | "warning";
  defaultValue?: string;
  value?: any;
  size?: "large" | "middle" | "small";
  isSortFilter?: boolean;
  showSearch?: boolean;
  onChange?: (value: any, option: any) => void;
}

const SelectCustom: React.FC<CustomSelectProps> = ({
  placeholder,
  style,
  select = [],
  status = "",
  defaultValue,
  allowClear,
  showSearch = true,
  value,
  size,
  isSearch = false,
  isSortFilter,
  onChange,
}) => {
  const [listSelect, setListSelect] = useState(select);

  useEffect(() => {
    if (select?.length) {
      setListSelect(select);
    }
  }, [select]);

  return (
    <Select
      size={size}
      style={style}
      placeholder={placeholder}
      status={status}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      allowClear={allowClear}
      showSearch={showSearch}
      optionFilterProp="children"
      filterOption={(input: any, option: any) =>
        isSearch
          ? true
          : (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
      }
      filterSort={(optionA: any, optionB: any) =>
        isSortFilter
          ? (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          : true
      }
      options={listSelect}
    />
  );
};

export default SelectCustom;
