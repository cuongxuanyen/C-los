import styled from "styled-components";

export const TextStyle = styled.div({
  color: "#00aaad",
  height: 35,
  margin: "10px 15px",
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  gap: 5,
  fontSize: 16,
  fontWeight: 600,
  "&:hover": {
    cursor: "pointer",
    borderBottom: "2px solid #e07a37",
    color: "#e07a37",
  },
});

export const NavMenuContainer = styled.div({
  width: "100%",
  display: "flex",
  fontSize: 14,
  height: 35,
  alignItems: "center",
  justifyContent: "flex-end",
  marginRight: 20,
  ".ant-menu-item:hover": {
    height: "35px !important" ,
    color: "#e07a37 !important",
  },
});

export const MenuContainer = styled.div({
  display: "flex",
  marginTop: 15,
  backgroundColor: "#FFFFFF",
  boxShadow: "0 1px 15px 1px rgba(69,65,78,.18)",
  borderRadius: 10,
});

export const TitlePageMenu = styled.div({
  fontSize: 16,
  fontWeight: 500,
  color: "#15313C",
  margin: "5px 0 12px 8px",
  display: "flex",
  flexDirection: "row",
  gap: 10,
  cursor: "pointer",
});

export const TitleSubMenu = styled.div({
  fontSize: 14,
  color: "#15313C",
  marginLeft: "10px",
});

export const ItemSubContent = styled.div({
  padding: "8px",
  display: "flex",
  borderRadius: 5,
  justifyContent: "space-between",
  "&:hover": {
    cursor: "pointer",
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
});

export const ItemPageContent = styled.div({
  padding: 10,
});

export const SubContainer = styled.div({
  minWidth: "12rem",
  display: "flex",
  backgroundColor: "#FFFFFF",
  "&:hover": {
    cursor: "pointer",
  },
});

export const TitleSubPage = styled.div({
  fontSize: 16,
  fontWeight: 500,
  marginLeft: 10,
  color: "#15313C",
});
