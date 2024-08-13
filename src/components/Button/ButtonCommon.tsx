import { Button } from "antd";
import React from "react";
import {
  PlusOutlined,
  ImportOutlined,
  ExportOutlined,
  FolderOpenOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

interface Props {
  onClick?: () => void;
  type?: "add" | "import" | "export" | "search" | "viewReport";
}

const AddButton = styled(Button)({
  border: "none",
  "&:hover": {
    color: "#15313c !important",
  },
});

const ButtonCommon: React.FC<Props> = ({ onClick, type }) => {
  const [t] = useTranslation("global");

  const renderButton = () => {
    switch (type) {
      case "add":
        return {
          icon: <PlusOutlined />,
          text: t("AddNew"),
          backgroundColor: "#A5D6A7",
          width: "auto",
        };
      case "import":
        return {
          icon: <ImportOutlined />,
          text: t("import"),
          backgroundColor: "#C8E6C9",
          width: 121,
          minwidth: "fit-content",
        };
      case "export":
        return {
          icon: <ExportOutlined />,
          text: t("export"),
          backgroundColor: "#FBF4EC",
          width: 121,
        };
      case "search":
        return {
          icon: "",
          text: t("search"),
          backgroundColor: "#66BB69",
          width: 121,
        };

      case "viewReport":
        return {
          icon: <FolderOpenOutlined />,
          text: t("viewReport"),
          backgroundColor: "#A5D6A7",
          width: "auto",
        };
      default:
        return;
    }
  };

  return (
    <AddButton
      icon={renderButton()?.icon}
      style={{
        width: renderButton()?.width,
        minWidth: renderButton()?.minwidth,
        height: 36,
        backgroundColor: renderButton()?.backgroundColor,
        color: "#15313C",
        fontWeight: 600,
      }}
      onClick={onClick}
    >
      {renderButton()?.text}
    </AddButton>
  );
};

export default ButtonCommon;
