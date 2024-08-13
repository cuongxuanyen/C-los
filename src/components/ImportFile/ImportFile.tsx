import React, { useEffect, useState } from "react";
import ButtonCustom from "../Button/ButtonCustom";
import { Header } from "antd/es/layout/layout";
import {
  ModalBlock,
  ModalContent,
  ModalFooter,
  ModalTitle,
} from "./ImportFile.styled";
import { Col, Modal, Progress, Row, Upload } from "antd";
import "./ImportFile.css";
import { useTranslation } from "react-i18next";
import images from "@/res/images";
import PopupConfirmImport from "../PopupComfirmImport/PopupConfirmImport";
interface ModalProps {
  open: boolean;
  isFooter?: boolean;
  width?: any;
  onOk?: any;
  onCancel?: any;
  onExportFile?: () => void;
  onDataImport?: () => void;
  dataChidren?: any;
  isRefesh?: boolean;
  callBackList?: any;
}

const ImportFile: React.FC<ModalProps> = ({
  open,
  isFooter = true,
  width,
  onOk,
  onCancel,
  onExportFile,
  dataChidren,
  isRefesh,
  callBackList,
}) => {
  const [t] = useTranslation("global");
  const [openConfirm, setOpenConfirm] = useState(false);
  const [fileNameImport, setFileNameImport] = useState<string>("");
  const orgCode = sessionStorage.getItem("orgCode");
  const [img, setImg] = useState<string>("images.cloud_upload");
  const [isChange, setIsChange] = useState<boolean>(false);
  const [isImportButton, setIsImportButton] = useState<boolean>(false);
  const [progress, setProgress] = useState(0);
  const [viewProgress, setViewProgress] = useState<boolean>(true);
  const [dataSource, setDataSource] = useState();

  useEffect(() => {
    if (orgCode) {
      setFileNameImport("");
      setImg("update");
      setIsChange(false);
      dataChidren();
      setIsImportButton(false);
      setProgress(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orgCode, isRefesh]);

  const handleChange = (info: any) => {
    setFileNameImport(info.file.name);
    const fileListLength = info.fileList.length - 1;
    setProgress(Math.floor(info.fileList[fileListLength].percent));
    if (info.file.status === "uploading") {
      setViewProgress(true);
      setProgress(80);
    } else if (info.file.status === "done") {
      setProgress(100);
      setViewProgress(false); // Ẩn thanh tiến trình khi upload hoàn thành
    }
  };

  const customRequest = (options: any) => {
    if (options.file.name) {
      setTimeout(() => {
        options.onSuccess();
        setIsImportButton(true);
      }, 1000);
    } else {
      options.onError();
      setIsImportButton(false);
    }
    // Không thực hiện gửi file lên server
  };

  const beforeUpload = (file: any) => {
    const isXLSX =
      file.type ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    if (!isXLSX) {
    } else {
      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
      } else {
        setIsChange(true);
        setImg("images.excel");
        dataChidren(file);
      }
    }
  };
  const actionImport = async () => {
    const response = await onOk();
    if (response) {
      setDataSource(response);
      // setOpenConfirm(true);
      callBackList();
    }
    onCancel();
  };
  const handleCancel = async () => {
    await setOpenConfirm(false);
    setIsChange(false);
    setFileNameImport("");
    setProgress(0);
    setImg("images.cloud_upload");
  };

  return (
    <>
      <PopupConfirmImport
        open={openConfirm}
        dataSource={dataSource}
        callBackList={callBackList}
        onCancel={() => {
          handleCancel();
        }}
      />
      <Modal
        open={open}
        className="modal modalCss"
        closable={false}
        footer=""
        width={width ? width : "50%"}
        onCancel={onCancel}
      >
        <ModalBlock>
          <Header
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "-webkit-fill-available",
              backgroundColor: "#C8E6C9",
              margin: 0,
              padding: "0 16px",
              borderRadius: "8px 8px 0 0",
              height: "40px",
            }}
          >
            <ModalTitle>{t("import")}</ModalTitle>
          </Header>
          <ModalContent>
            <Row gutter={16} justify="center" style={{ padding: "0 0.8rem" }}>
              <Col
                span={24}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 180,
                  border: "1px solid #ABBED1",
                  cursor: "pointer",
                  borderRadius: "8px",
                  marginTop: 56,
                }}
              >
                <Upload
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 10,
                    width: "100%",
                    height: "100%",
                  }}
                  customRequest={customRequest}
                  onChange={handleChange}
                  showUploadList={false}
                  beforeUpload={beforeUpload}
                  accept=".xlsx"
                  action="/upload"
                >
                  <span
                    style={{
                      width: "80%",
                      height: "100%",
                    }}
                  >
                    <Row gutter={16} justify="center">
                      <Col
                        className="gutter-row"
                        span={24}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {" "}
                        <img
                          src={img}
                          style={{ width: 100, height: 100 }}
                        ></img>
                        {viewProgress && (
                          <>
                            <Progress
                              percent={progress}
                              status="active"
                              size="small"
                              className="cssImportFile"
                            />{" "}
                          </>
                        )}
                      </Col>
                      {!isChange && (
                        <>
                          <Col
                            className="gutter-row"
                            span={24}
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              fontSize: 16,
                              color: "#15313C",
                            }}
                          >
                            <label
                              style={{
                                cursor: "pointer",
                                fontWeight: 200,
                                textAlign: "center",
                              }}
                            >
                              <span style={{ fontWeight: 600 }}>
                                {t("click")}
                              </span>{" "}
                              <span>{t("downloadFileor")}</span>{" "}
                              <span style={{ fontWeight: 600 }}>
                                {t("drag")}
                              </span>{" "}
                              <span>{t("theFileHere")}</span>
                            </label>
                          </Col>
                          <Col
                            className="gutter-row"
                            span={24}
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              fontSize: 12,
                              color: "#15313C",
                            }}
                          >
                            <label
                              style={{ cursor: "pointer", fontWeight: 600 }}
                            >
                              {t("maximumFileSize")}
                            </label>
                          </Col>
                        </>
                      )}

                      {isChange && (
                        <>
                          <Col
                            className="gutter-row"
                            span={24}
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              fontSize: 12,
                              color: "#15313C",
                              marginTop: 20,
                            }}
                          >
                            <label
                              style={{ cursor: "pointer", fontWeight: 600 }}
                            >
                              {t("textImport")}
                              {fileNameImport}
                            </label>
                          </Col>
                        </>
                      )}
                    </Row>
                  </span>
                </Upload>
              </Col>

              <Col
                className="gutter-row"
                span={24}
                style={{ textAlign: "center", margin: "8px 0 12px 0" }}
              >
                <p
                  style={{
                    fontSize: "12px",
                    color: "#87919C",
                    fontWeight: "400",
                  }}
                >
                  {t("textImportDes")}
                </p>
              </Col>
              <Col
                className="gutter-row"
                span={24}
                style={{ textAlign: "center" }}
              >
                <a
                  style={{
                    fontSize: "14px",
                    color: "#15313C",
                    fontWeight: "500",
                    textDecoration: "underline",
                    margin: "0 0 34px 0",
                  }}
                  onClick={onExportFile}
                >
                  {t("downloadSampleFile")}
                </a>
              </Col>
            </Row>
          </ModalContent>
          {isFooter && (
            <ModalFooter>
              {isImportButton ? (
                <ButtonCustom
                  colorButton="#47B14B"
                  colorText="white"
                  text={t("import")}
                  onClick={actionImport}
                  style={{ width: 200, height: 48, border: "none" }}
                />
              ) : (
                <ButtonCustom
                  colorButton="#F5F7FA"
                  colorText="#ABBED1"
                  text={t("import")}
                  style={{ width: 200, height: 48, border: "none" }}
                />
              )}

              <ButtonCustom
                colorButton="white"
                colorText="#388E3B"
                text={t("cancel")}
                onClick={onCancel}
                style={{ width: 200, height: 48 }}
              />
            </ModalFooter>
          )}
        </ModalBlock>
      </Modal>
    </>
  );
};

export default ImportFile;
