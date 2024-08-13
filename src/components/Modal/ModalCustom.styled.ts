import styled from "styled-components";

export const ModalBlock = styled.div({
  backgroundColor: "white",
  height: "84%",
});

export const ModalTitle = styled.h3({
  color: "white",
  fontWeight: "normal",
});

export const ModalContent = styled.div({
  padding: 10,
  overflowY: "scroll",
  overflowX: "hidden",
});

export const ModalFooter = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  backgroundColor: "white",
  height: 88,
  gap: 8,
  borderRadius: "0 0 8px 8px",
  padding: "0px 30px",
});
