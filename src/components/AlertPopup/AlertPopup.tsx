import React, { useEffect, useState } from "react";
import "./AlertPopup.css";
import { CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";
import images from "@/res/images";

interface Props {
  show?: boolean;
  type?: "Success" | "Warning" | "Error";
  textHeader?: string;
  textContent?: string;
  onCancel?: () => void;
  onOk?: () => void;
  textOK?: string;
  textCancel?: string;
}
const AlertPopup: React.FC<Props> = ({
  show,
  type,
  textHeader,
  textContent,
  onCancel,
  onOk,
  textOK,
  textCancel,
}) => {
  const [imgsource, setImgSource] = useState("");
  useEffect(() => {
    listenInvoiceType();
  }, [show]);

  const listenInvoiceType = () => {
    switch (type) {
      case "Success":
        setImgSource("images.Success");
        break;
      case "Warning":
        setImgSource("images.Warning");
        break;
      case "Error":
        setImgSource("images.Error");
        break;
      default:
        setImgSource("");
        break;
    }
  };

  return (
    <>
      <div className="divContainerPopup">
        <div className="divPopup">
          <Button className="buttonPopup" onClick={onCancel}>
            <CloseOutlined />
          </Button>

          <div className="divImg">
            <img src={imgsource} />
            <h3>{textHeader}</h3>
            <p>{textContent}</p>
          </div>
          <div className="divButtonContainer">
            <div className="divButton">
              <Button onClick={onOk} className="buttonOk buttonAction">
                <span className="setColor">{textOK}</span>
              </Button>
              <Button onClick={onCancel} className="buttonCancel buttonAction">
                <span>{textCancel}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AlertPopup;
