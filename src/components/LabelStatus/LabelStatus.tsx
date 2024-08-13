import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

export const TitleStatusCont = styled.div({
  gap: 8,
  marginLeft: 5,
  width: "max-content",
  display: "flex",
  alignItems: "center",
  borderRadius: 30,
  padding: "0 10px",
});
export const IconIdot = styled.div({
  borderRadius: "50%",
  width: 10,
  height: 10,
});

interface Props {
  type:
    | "active"
    | "inactive"
    | "lock"
    | "success"
    | "error"
    | "waitingForSignature"
    | "valid"
    | "invalid"
    | "submitted"
    | "inProgress"
    | "failed"
    | "cancelled"
    | "sendingToSignature"
    | "draft"
    | "signed"
    | "sendingToMyInvois"
    | "rejectedByMyInvois"
    | "PartialSuccess"
    | "read"
    | "unread"
    | "invoice"
    | "selfBilled"
    | "receipt"
    | "unmapped";
  style?: any;
}

const LabelStatus: React.FC<Props> = ({ type, style }) => {
  const [t] = useTranslation("global");

  const renderTitleStatus = () => {
    switch (type) {
      case "active":
        return {
          text: t("active"),
          backgroundColor: "#4976F4",
        };
      case "inactive":
        return {
          text: t("inActive"),
          backgroundColor: "#87919C",
        };
      case "lock":
        return {
          text: t("lock"),
          backgroundColor: "#FF3030",
        };
      case "success":
        return {
          text: t("success"),
          backgroundColor: "#388E3B",
        };
      case "error":
        return {
          text: t("error"),
          backgroundColor: "#FF3030",
        };
      case "waitingForSignature":
        return {
          text: t("waitingForSignature"),
          backgroundColor: "#F4C03D",
        };
      case "valid":
        return {
          text: t("valid"),
          backgroundColor: "#388E3B",
        };
      case "invalid":
        return {
          text: t("invalid"),
          backgroundColor: "#F46A68",
        };
      case "submitted":
        return {
          text: t("submitted"),
          backgroundColor: "#4976F4",
        };
      case "inProgress":
        return {
          text: t("inProgress"),
          backgroundColor: "#2EA0FF",
        };
      case "failed":
        return {
          text: t("failed"),
          backgroundColor: "#F46A68",
        };
      case "cancelled":
        return {
          text: t("cancelled"),
          backgroundColor: "#F46A68",
        };
      case "sendingToSignature":
        return {
          text: t("sendingToSignature"),
          backgroundColor: "#F4C03D",
        };
      case "draft":
        return {
          text: t("draft"),
          backgroundColor: "#87919C",
        };
      case "signed":
        return {
          text: t("Signed"),
          backgroundColor: "#2EA0FF",
        };
      case "sendingToMyInvois":
        return {
          text: t("sendingToMyInvois"),
          backgroundColor: "#F4C03D",
        };
      case "rejectedByMyInvois":
        return {
          text: t("rejectedByMyInvois"),
          backgroundColor: "#F46A68",
        };
      case "PartialSuccess":
        return {
          text: t("PartialSuccess"),
          backgroundColor: "#388E3B",
        };
      case "read":
        return {
          text: "Read",
          backgroundColor: "#388E3B",
        };
      case "unread":
        return {
          text: "Unread",
          backgroundColor: "#F46A68",
        };
      case "invoice":
        return {
          text: t("invoice"),
          backgroundColor: "#4976F4",
        };
      case "selfBilled":
        return {
          text: t("selfBilled"),
          backgroundColor: "#4976F4",
        };
      case "receipt":
        return {
          text: t("receipt"),
          backgroundColor: "#4976F4",
        };
      case "unmapped":
        return {
          text: t("unmapped"),
          backgroundColor: "#388E3B",
        };
      default:
        return;
    }
  };

  return (
    <TitleStatusCont
      style={{
        ...style,
        color: renderTitleStatus()?.backgroundColor,
        border: `1px solid ${renderTitleStatus()?.backgroundColor}`,
      }}
    >
      <IconIdot
        style={{
          backgroundColor: renderTitleStatus()?.backgroundColor,
        }}
      />
      {renderTitleStatus()?.text}
    </TitleStatusCont>
  );
};

export default LabelStatus;
