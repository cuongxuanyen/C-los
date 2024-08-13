import styled from "styled-components";

export const TextStyle = styled.div({
  color: "black",
  height: 35,
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  gap: 5,
});

export const TextFooter = styled.div({
  fontWeight: 600,
  fontSize: 18,
  color: "#00aaad",
  textAlign: "center",
  padding: 20,
  borderTop: "1px solid #d5d5d5"
});

export const SubContainer = styled.div({
  minWidth: "12rem",
  display: "flex",
  backgroundColor: "#FFFFFF",
  "&:hover": {
    cursor: "pointer",
  },
});

export const MenuContainer = styled.div({
  display: "flex",
  backgroundColor: "#FFFFFF",
  flexDirection: "column",
  alignItems: "center",
  padding: 10,
});
export const ItemContainer = styled.div({
  display: "flex",
  backgroundColor: "#FFFFFF",
  flexDirection: "column",
  padding: 10,
});

export const TitlePageMenu = styled.div({
  fontSize: 16,
  fontWeight: 500,
  color: "#15313C",
  textAlign: "center",
});

export const TitleSubPage = styled.div({
  fontSize: 16,
  fontWeight: 500,
  marginLeft: 10,
  color: "#15313C",
});

export const TitleItemLang = styled.div({
  fontSize: 14,
  color: "#15313C",
});

export const TitleSubMenu = styled.div({
  fontSize: 14,
  color: "#15313C",
  margin: "0 10px 0 10px",
});

export const TitleEmail = styled.div({
  fontSize: 14,
  color: "#15313C",
});

export const ItemSubContent = styled.div({
  padding: "8px",
  display: "flex",
  borderRadius: 5,
  "&:hover": {
    cursor: "pointer",
  },
});

export const ItemSubLang = styled.div({
  padding: "8px 0 8px 0",
  display: "flex",
  width: "100%",
  borderBottom: "1px solid #d8dfe0",
  "&:hover": {
    cursor: "pointer",
    backgroundColor: "#F5F5F5",
  },
});

export const ItemPageContent = styled.div({
  padding: 5,
});

export const EditImage = styled.img({
  position: "absolute",
  "&:hover": {
    cursor: "pointer",
  },
});

export const ItemBusiness = styled.div({
  lineHeight: "20px",
  display: "contents",
  fontWeight: 500,
});

export const DataBusiness = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

export const CardLogout = styled.div({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: 8,
  "&:hover": {
    cursor: "pointer",
  },
});

export const TitleLogout = styled.div({
  whiteSpace: "nowrap",
});
