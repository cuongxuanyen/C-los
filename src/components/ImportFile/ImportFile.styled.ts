import styled from "styled-components";

export const ModalBlock = styled.div({
  boxShadow: "0 1px 15px 1px rgba(69,65,78,.08)",
  borderRadius: "8px",
});

export const ModalTitle = styled.h3({
  color: "#15313C",
  fontSize: 20,
  fontWeight: 500,
});

export const ModalContent = styled.div({
  padding: 10,
  maxHeight: "60vh",
  overflow: "auto",
});

export const ModalFooter = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "white",
  height: 92,
  gap: 8,
  borderRadius: "0 0 8px 8px",
});
