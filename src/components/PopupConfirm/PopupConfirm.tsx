import React, { useEffect } from "react";
import { Modal } from "antd";
import { useTranslation } from "react-i18next";
import {
  ConfirmContainer,
  TitlePopup,
  DescriptionPopup,
  WrapperBtn,
  ContentFooter,
} from "./PopupConfirm.styled";
import images from "@/res/images";
import ButtonCustom from "../Button/ButtonCustom";
import { CloseOutlined } from "@ant-design/icons";

export interface SettingProfileProps {
  open: boolean;
  cancelText?: string;
  okText?: string;
  description?: any;
  colorDescription?: string;
  title?: any;
  isButtonCancel?: boolean;
  isIconClose?: boolean;
  isButtonOk?: boolean;
  iconType?: "warning" | "success" | "error";
  iconBtn?: any;
  onCancel?: () => void;
  onOk?: () => void;
}

const PopupConfirm: React.FC<SettingProfileProps> = ({
  open,
  onCancel,
  onOk,
  cancelText,
  okText,
  title,
  description,
  colorDescription,
  iconType,
  iconBtn,
  isIconClose = false,
  isButtonOk = true,
  isButtonCancel = true,
}) => {
  const [t] = useTranslation("global");
  useEffect(() => {}, []);
  const RenderIconType = (type: any) => {
    switch (type) {
      case "warning":
        return <img src={images.Warning} style={{ width: 168, height: 168 }} />;
      case "success":
        return <img src={images.Success} style={{ width: 168, height: 168 }} />;
      case "error":
        return <img src={images.Error} style={{ width: 168, height: 168 }} />;
    }
  };
  return (
    <>
      <Modal
        open={open}
        closable={false}
        onOk={onOk}
        onCancel={onCancel}
        cancelText={cancelText ? cancelText : t("cancel")}
        okText={okText ? okText : t("confirm")}
        footer={false}
        centered={true}
      >
        <ConfirmContainer>
          {isIconClose && (
            <ButtonCustom
              colorButton="#FFF"
              colorText="#00aaad"
              style={{
                // border: "0",
                border: "1px solid #00aaad",
                boxShadow: "none",
                position: "absolute",
                right: 0,
                top: 0,
                margin: 20,
              }}
              icon={<CloseOutlined />}
              onClick={onCancel}
            />
          )}
          {RenderIconType(iconType)}
          {title && <TitlePopup>{title}</TitlePopup>}
          {description && (
            <DescriptionPopup
              style={{ color: colorDescription ? colorDescription : "" }}
            >
              {description}
            </DescriptionPopup>
          )}
          <ContentFooter>
            {isButtonOk && (
              <WrapperBtn>
                <ButtonCustom
                  colorButton="#df7630"
                  style={{
                    height: 40,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexFlow: "row-reverse",
                    borderRadius: 30,
                    gap: 8,
                  }}
                  icon={iconBtn}
                  text={okText ? okText : t("confirm")}
                  onClick={onOk}
                />
              </WrapperBtn>
            )}
            {isButtonCancel && (
              <WrapperBtn>
                <ButtonCustom
                  colorButton="#FFFFFF"
                  colorText="#00aaad"
                  style={{
                    height: 40,
                    border: "1px solid #00aaad",
                    width: "100%",
                    borderRadius: 30,
                  }}
                  text={cancelText ? cancelText : t("cancel")}
                  onClick={onCancel}
                />
              </WrapperBtn>
            )}
          </ContentFooter>
        </ConfirmContainer>
      </Modal>
    </>
  );
};

export default PopupConfirm;
