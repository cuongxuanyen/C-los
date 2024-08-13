import React, { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import PopupConfirm from "@/components/PopupConfirm/PopupConfirm";
import { FileLink } from "./PopupConfirmImport.styled";

interface Props {
  open: boolean;
  dataSource: any;
  onCancel: () => void;
  callBackList: () => void;
}

const PopupConfirmImport: React.FC<Props> = ({
  open,
  dataSource,
  onCancel,
  callBackList,
}) => {
  const [t] = useTranslation("global");
  const navigate = useNavigate();
  useEffect(() => {}, []);
  const statusImport = useMemo(() => {
    if (
      (dataSource && Object.entries(dataSource).length === 0) ||
      dataSource?.status === 201
    ) {
      callBackList();
      return "timeout";
    }
    if (dataSource?.status === 200) {
      callBackList();
      if (dataSource?.data?.totalRow === dataSource?.data?.totalSuccess) {
        return "success";
      } else {
        return "partialSuccess";
      }
    } else {
      return "error";
    }
  }, [dataSource, open]);
  const handleCancel = () => {
    onCancel();
  };
  const getDescription = (status: string) => {
    switch (status) {
      case "success":
        return (
          <div style={{ color: "#25B581" }}>{`${
            dataSource?.data?.totalSuccess || 0
          }/${dataSource?.data?.totalRow || 0}`}</div>
        );
      case "error":
        return (
          <div style={{ color: "#FA0B0B" }}>
            {dataSource?.message ? dataSource?.message : t("confirmError")}
          </div>
        );
      case "partialSuccess":
        return (
          <div style={{ display: "flex", gap: "4px" }}>
            {t("PleaseAccess")}{" "}
            <FileLink onClick={() => navigate("/file-management")}>
              {t("fileManagement")}
            </FileLink>{" "}
            {t("toCheckStatus")}
          </div>
        );
      case "timeout":
        return (
          <div style={{ display: "flex", gap: "4px" }}>
            {t("PleaseAccess")}{" "}
            <FileLink onClick={() => navigate("/file-management")}>
              {t("fileManagement")}
            </FileLink>{" "}
            {t("toCheckStatus")}
          </div>
        );
    }
  };

  const getTitle = (status: string) => {
    switch (status) {
      case "success":
        return <div>{"File imported successfully!"}</div>;
      case "error":
        return <div>{"File import failed!"}</div>;
      case "partialSuccess":
        return (
          <div style={{ display: "flex", gap: "4px" }}>
            {t("FileImportedSuccess")}{" "}
            <div style={{ color: "#FA0B0B" }}>
              {`${dataSource?.data?.totalSuccess || 0}/${
                dataSource?.data?.totalRow || 0
              }`}
            </div>
            {t("totalRecords")}!
          </div>
        );
      case "timeout":
        return <div>{`${t("titleTimeoutProcess")}!`}</div>;
    }
  };
  const getImageStatus = (status: any) => {
    switch (status) {
      case "success":
        return "success";
      case "error":
        return "error";
      case "partialSuccess":
        return "success";
      case "timeout":
        return "warning";
    }
  };

  return (
    <>
      <PopupConfirm
        open={open}
        onOk={() => {}}
        cancelText={t("cancel")}
        title={getTitle(statusImport)}
        description={getDescription(statusImport)}
        isButtonOk={false}
        isIconClose={true}
        iconType={getImageStatus(statusImport)}
        onCancel={handleCancel}
      />
    </>
  );
};

export default PopupConfirmImport;
