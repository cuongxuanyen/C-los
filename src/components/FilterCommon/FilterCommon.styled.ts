import styled from "styled-components";

export const TitleStatus = styled.div({
  gap: 8,
  marginLeft: 5,
  width: "max-content",
  display: "flex",
  alignItems: "center",
  borderRadius: 30,
  padding: "3px 10px",
  background: "#D2E9FF",
});

export const LabelForm = styled.span({
  minWidth: "fit-content",
  alignContent: "center",
  fontWeight: 500,
  fontSize: 16,
});

export const FormBox = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 5,
});

export const ContainerFilter = styled.div({
  display: "flex",
  alignItems: "center",
});

export const Filters = styled.div({
  display: "flex",
  padding: "10px 10px",
  width: "auto",
  justifyContent: "space-around",
  background: "#FFFFFF",
  gap: 10,
  alignItems: "center",
  border: "1px solid #66BB69",
  borderRadius: 4,
  "&:hover": {
    cursor: "pointer",
  },
});

export const ListFilter = styled.div({
  display: "flex",
  paddingLeft: 5,
  gap: 10,
  alignItems: "center",
  marginRight: 50,
});

export const DropdownFilter = styled.div({
  display: "flex",
  padding: 20,
  background: "#FFFFFF",
  flexDirection: "column",
  borderRadius: 8,
  gap: 10,
  boxShadow: "0px 4px 8px 0px rgba(171, 190, 209, 0.4)",
});

export const HeaderFilter = styled.div({
  display: "flex",
  justifyContent: "space-between",
  fontSize: 20,
  fontWeight: 400,
});

export const FormFieldDate = styled.div({
  display: "flex",
  gap: 10,
});

export const BottomFilter = styled.div({
  display: "flex",
  justifyContent: "flex-end",
  gap: 10,
});

export const ContainerChip = styled.div({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  width: "-webkit-fit-content",
  height: 20,
});

export const TitleChip = styled.div({
  color: "#87919C",
  height: "fit-content",
  width: "max-content",
});

export const ClearAll = styled.div({
  color: "#4976F4",
  marginLeft: 5,
  width: "max-content",
  height: "fit-content",
  position: "absolute",
  right: 0,
  "&:hover": {
    cursor: "pointer",
  },
});

export const ContainerListSelect = styled.div({
  display: "flex",
  flexFlow: "wrap",
  gap: 10,
});
