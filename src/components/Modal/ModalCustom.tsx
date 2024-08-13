import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import ButtonCustom from "../Button/ButtonCustom";
import { Header } from "antd/es/layout/layout";
import { ModalContent, ModalTitle } from "./ModalCustom.styled";
import { Col, Modal, Row } from "antd";
import "./modal.css";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/hooks";

interface ModalProps {
  title?: string;
  open: boolean;
  isFooter?: boolean;
  content?: any;
  cancel?: string;
  submit?: string;
  textOtherButton?: string;
  disabled?: boolean;
  width?: any;
  isNotDisplaySave?: boolean; //truyền biến này khi ko dùng nút save
  isSaveAndAdd?: boolean; //truyền biến này khi cần dùng thêm nút Save và add
  onOk?: () => void;
  onOkAndAdd?: () => void;
  onCancel?: () => void;
  maxHeight?: string | number;
}

const ModalCustom: React.FC<ModalProps> = ({
  title,
  open,
  isFooter = true,
  content,
  cancel,
  submit,
  textOtherButton,
  disabled,
  width,
  isNotDisplaySave,
  isSaveAndAdd,
  onOk,
  onOkAndAdd,
  onCancel,
  maxHeight,
}) => {
  const [t] = useTranslation("global");
  return (
    <>
      <Modal
        open={open}
        className="modal"
        closable={false}
        footer=""
        width={width ? width : "50%"}
        onCancel={onCancel}
        centered={true}
      >
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
            height: 40,
            color: "#15313C",
            fontSize: 20,
          }}
        >
          <ModalTitle>{title}</ModalTitle>
          <ButtonCustom
            colorButton="#C8E6C9"
            colorText="#15313C"
            style={{
              border: "0",
              boxShadow: "none",
            }}
            icon={<CloseOutlined />}
            onClick={onCancel}
          />
        </Header>
        <ModalContent style={{ maxHeight: maxHeight ? maxHeight : "70vh" }}>
          {content}
        </ModalContent>
        {isFooter && (
          <Row
            gutter={16}
            style={{
              justifyContent: "flex-end",
              height: 88,
              alignItems: "center",
              padding: "0px 10px",
            }}
          >
            {isNotDisplaySave ? (
              ""
            ) : (
              <>
                {isSaveAndAdd && (
                  <Col className="gutter-row" span={8}>
                    <ButtonCustom
                      colorButton="#47B14B"
                      text={textOtherButton ? textOtherButton : t("saveAdd")}
                      onClick={onOkAndAdd}
                      disabled={disabled}
                      style={{
                        height: "45px",
                        width: "100%",
                        fontSize: 16,
                      }}
                    />
                  </Col>
                )}
                <Col className="gutter-row" span={8}>
                  <ButtonCustom
                    colorButton="#47B14B"
                    text={submit}
                    onClick={onOk}
                    disabled={disabled}
                    style={{
                      height: "45px",
                      width: "100%",
                      fontSize: 16,
                    }}
                  />
                </Col>
              </>
            )}
            <Col className="gutter-row" span={8}>
              <ButtonCustom
                colorButton="white"
                colorText="#388E3B"
                text={cancel}
                onClick={onCancel}
                style={{
                  height: "48px",
                  width: "100%",
                  fontSize: 16,
                }}
              />
            </Col>
          </Row>
        )}
      </Modal>
    </>
  );
};

export default ModalCustom;
