import React from "react";
import { Tabs } from "antd";
import "./tabs-custom.css";

interface TabsProps {
  items?: any;
  defaultActiveKey?: string;
  onChange?: (e: any) => void;
}

const TabsCustom: React.FC<TabsProps> = ({
  items,
  defaultActiveKey,
  onChange,
}) => (
  <Tabs
    defaultActiveKey={defaultActiveKey}
    items={items}
    onChange={onChange}
    size="large"
  />
);

export default TabsCustom;
