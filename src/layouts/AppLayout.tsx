import React, { useEffect, useState } from "react";
import {
  UserOutlined,
  SettingOutlined,
  ToTopOutlined,
} from "@ant-design/icons";
import { Layout, Popover, Avatar, Divider } from "antd";
import { useNavigate } from "react-router-dom";
import images from "@/res/images";
import {
  EditImage,
  ItemContainer,
  ItemSubContent,
  MenuContainer,
  TextFooter,
  TitleEmail,
  TitlePageMenu,
  TitleSubMenu,
} from "./Applayout.styled";
import { useAppDispatch } from "@/hooks";
import { TestActions } from "@/reduxSaga/TestRedux";
import Loading, { loading } from "@/components/Loading/Loading";
import MenuCustom from "./menu/MenuCustom";

const { Header, Content } = Layout;

export interface IAppLayoutProps {
  children?: any;
  width?: any;
  [key: string]: any;
}
//@ts-ignore
const AppLayout: React.FC<IAppLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [dataProfile, setDataProfile] = useState<any>({});

  useEffect(() => {
    dispatch(TestActions.testActionRequest({}));
  }, []);
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const handleOpenSetting = () => {
    setOpen(false);
    navigate("/setting-profile");
  };
  const handleOpenChangePassword = () => {
    setOpen(false);
  };

  const handleChangePage = () => {};
  const handleOpenSettingImage = () => {
    setOpen(false);
  };

  return (
    <Layout>
      <Loading />
      <Header
        style={{
          position: "sticky",
          top: 0,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#ffffff",
          height: 56,
          gap: 20,
          boxShadow: "0 1px 15px 1px rgba(69,65,78,.08)",
          padding: "0 50px",
        }}
        onClick={() => handleChangePage()}
      >
        <div
          style={{
            alignItems: "center",
            display: "flex",
            cursor: "pointer",
          }}
          onClick={() => {}}
        >
          <img src={images.Logo} style={{ height: 47 }} />
          <MenuCustom />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Popover
            placement="bottomRight"
            content={
              <>
                {
                  <div style={{ maxWidth: 300 }}>
                    <MenuContainer>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column-reverse",
                          alignItems: "end",
                        }}
                      >
                        <Avatar
                          src={""}
                          icon={<UserOutlined />}
                          style={{
                            cursor: "pointer",
                            width: 50,
                            height: 50,
                          }}
                        />
                        <EditImage
                          src={images.Logo}
                          onClick={() => handleOpenSettingImage()}
                        />
                      </div>
                      <TitlePageMenu>{`${dataProfile?.user?.firstName} ${dataProfile?.user?.lastName}`}</TitlePageMenu>
                      <TitleEmail>{dataProfile?.user?.email}</TitleEmail>
                    </MenuContainer>
                    <ItemContainer>
                      <ItemSubContent
                        onClick={() => handleOpenChangePassword()}
                      >
                        <img src={images.Logo} />
                        <TitleSubMenu>{"changePassword"}</TitleSubMenu>
                      </ItemSubContent>
                      <ItemSubContent onClick={() => handleOpenSetting()}>
                        <SettingOutlined
                          style={{ fontSize: 20, color: "#848484" }}
                        />
                        <TitleSubMenu>{"accountSetting"}</TitleSubMenu>
                      </ItemSubContent>
                      <Divider style={{ margin: "10px 0" }} />
                      <ItemSubContent onClick={() => {}}>
                        <ToTopOutlined
                          rotate={90}
                          style={{
                            fontSize: 20,
                            color: "#848484",
                          }}
                        />
                        <TitleSubMenu>{"logout"}</TitleSubMenu>
                      </ItemSubContent>
                    </ItemContainer>
                  </div>
                }
              </>
            }
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
          >
            <div>
              <Avatar
                src={""}
                icon={<UserOutlined />}
                style={{ cursor: "pointer", width: 32, height: 32 }}
              />
            </div>
          </Popover>
        </div>
      </Header>
      <Content
        style={{
          padding: "24px",
          position: "absolute",
          height: "calc(100vh - 55px)",
          width: "100%",
          top: 55,
          overflowY: "scroll",
          overflowX: "auto",
        }}
      >
        {children}
        <TextFooter>Một sản phẩm của khối CNNH - Ngân hàng An Bình</TextFooter>
      </Content>
    </Layout>
  );
};

export default AppLayout;
function useAppSelector(arg0: (state: any) => any): { loading: any } {
  throw new Error("Function not implemented.");
}
