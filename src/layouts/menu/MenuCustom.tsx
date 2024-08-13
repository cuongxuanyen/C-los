import React, { useEffect, useState } from "react";
import {
  ItemPageContent,
  ItemSubContent,
  MenuContainer,
  NavMenuContainer,
  TextStyle,
  TitlePageMenu,
  TitleSubMenu,
} from "./MenuCustom.styled";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Dropdown, Menu, MenuProps } from "antd";

const MenuCustom: React.FC = () => {
  const navigate = useNavigate();

  const [openSystem, setOpenSystem] = useState(false);
  const [openInvoices, setOpenInvoices] = useState(false);
  const [openReceipt, setOpenReceipt] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const [subView, setSubView] = useState<"MAIN" | "CATEGORY" | "EMAIL">("MAIN");

  useEffect(() => {
    if (!openSystem) {
      setSubView("MAIN");
    }
  }, [openSystem]);

  const listPage = (itemMenu: any, onClick: any) => {
    return (
      <div key={itemMenu?.label}>
        {itemMenu && (
          <ItemPageContent key={itemMenu?.key}>
            {itemMenu.label && (
              <TitlePageMenu onClick={() => setSubView("MAIN")}>
                <RightOutlined />
                {itemMenu.label}
              </TitlePageMenu>
            )}
            {itemMenu?.children &&
              itemMenu?.children &&
              itemMenu?.children.map((sub: any) => {
                if (sub) {
                  return (
                    <ItemSubContent
                      key={sub?.key}
                      onClick={() => onClick(sub.key)}
                    >
                      <div style={{ display: "flex" }}>
                        {sub.icon}
                        <TitleSubMenu>{sub.label}</TitleSubMenu>
                      </div>
                      <div>{sub.suffixIcon}</div>
                    </ItemSubContent>
                  );
                }
              })}
          </ItemPageContent>
        )}
      </div>
    );
  };

  const itemsDashboard: MenuProps["items"] = [
    {
      key: "",
      label: "Trang chủ",
    },
  ];
  const itemsSoanHS: MenuProps["items"] = [];
  const itemsJobManagement: MenuProps["items"] = [];

  const itemsReceipt: MenuProps["items"] = [
    {
      key: "DSGoiYeuCau",
      label: "Danh sách gói yêu cầu",
    },
    {
      key: "TaoGoiYeuCau",
      label: "Tạo gói yêu cầu",
    },
    {
      key: "TimKiemHS",
      label: "Tìm kiếm hồ sơ",
    },
    {
      key: "DSHoSoTheoTrangThai",
      label: "Danh sách hồ sơ theo trạng thái",
      children: [
        {
          key: "TatCaHoSo",
          label: "Tất cả hồ sơ chưa hoàn tất",
        },
        {
          key: "DangSoanThao",
          label: "Đang soạn thảo",
        },
        {
          key: "Khongdongy",
          label: "Không đồng ý",
        },
        {
          key: "ChoXuly",
          label: "chờ xử lý",
        },
      ],
    },
    {
      key: "BaoCao",
      label: "Báo cáo",
      children: [
        {
          key: "DSSoLuongGiaoDich",
          label: "Danh sách số lượng giao dịch",
        },
        {
          key: "DSLichSuGiaoDich",
          label: "Danh sách lịch sử giao dịch",
        },
        {
          key: "BCMiniTask",
          label: "Báo cáo mini task",
        },
        {
          key: "TrangThaiUser",
          label: "Trạng thái user",
        },
        {
          key: "TheoDoiNoHS",
          label: "Theo dõi nợ hồ sơ",
        },
        {
          key: "BClichsuno",
          label: "Báo cáo lịch sử nợ",
        },
      ],
    },
  ];

  const itemsHosoTDTD: MenuProps["items"] = [
    {
      key: "invoice-summary-report",
      label: "Danh sách hồ sơ TĐTD",
    },
    {
      key: "details-invoice-summary-report",
      label: "Báo cáo TĐTD",
    },
    {
      key: "document-type-summary-report",
      label: "Thông tin TĐTD",
    },
    {
      key: "daily-recon-report",
      label: "Chuyển hồ sơ sang LCCT",
    },
    {
      key: "inward-invoice-report",
      label: "Báo cáo chi tiết trạng thái",
    },
    {
      key: "invoice-cancel-report",
      label: "Quản lý hồ sơ lưu trữ",
    },
  ];
  const clickReport = (key: string) => {
    actionCloseMenu();
    switch (key) {
      case "invoice-summary-report":
        navigate("/invoice-summary-report");
        break;
      case "details-invoice-summary-report":
        navigate("/details-invoice-summary-report");
        break;
      case "document-type-summary-report":
        navigate("/document-type-summary-report");
        break;
      case "daily-recon-report":
        navigate("/daily-recon-report");
        break;
      case "inward-invoice-report":
        navigate("/inward-invoice-report");
        break;
      case "invoice-cancel-report":
        navigate("/invoice-cancel-report");
        break;
      default:
        break;
    }
  };

  const clickInvoice = (key: string) => {
    actionCloseMenu();
    switch (key) {
      case "invoice-list":
        navigate("/invoice-list");
        break;
      default:
        break;
    }
  };

  const clickReceipt = (key: string) => {
    actionCloseMenu();
    switch (key) {
      case "list-receipt":
        navigate("/list-receipt");
        break;
      default:
        break;
    }
  };

  const clickConfiguration = (key: string) => {
    switch (key) {
      case "category":
        setSubView("CATEGORY");
        break;
      default:
        actionCloseMenu();
        break;
    }
  };
  const actionCloseMenu = () => {
    setOpenSystem(false);
    setOpenInvoices(false);
    setOpenReport(false);
    setSubView("MAIN");
  };
  return (
    <NavMenuContainer>
      {
        <div>
          <TextStyle onClick={(e) => e.preventDefault()}>
            {"Trang chủ"}
          </TextStyle>
        </div>
      }
      <div
        onMouseMove={() => {
          setOpenReceipt(true);
        }}
        onMouseOut={() => setOpenReceipt(false)}
      >
        <Dropdown
          open={openReceipt}
          overlayStyle={{ zIndex: 9999 }}
          menu={{
            items: itemsReceipt,
          }}
        >
          <TextStyle onClick={(e) => e.preventDefault()}>
            {"Quản lý hồ sơ"}
          </TextStyle>
        </Dropdown>
      </div>
      <div>
        <TextStyle onClick={(e) => navigate("/soan-hoso-TDTD/CREATE")}>
          {"Soạn hồ sơ TĐTD"}
        </TextStyle>
      </div>
      <div
        onMouseMove={() => setOpenInvoices(true)}
        onMouseOut={() => setOpenInvoices(false)}
      >
        <Dropdown
          open={openInvoices}
          overlayStyle={{ zIndex: 9999 }}
          menu={{
            items: itemsHosoTDTD,
            onClick: () => {},
          }}
        >
          <TextStyle onClick={(e) => e.preventDefault()}>
            {"Quản lý hồ sơ TĐTD"}
          </TextStyle>
        </Dropdown>
      </div>
      {
        <div
          onMouseMove={() => setOpenSystem(true)}
          onMouseOut={() => setOpenSystem(false)}
        >
          <Dropdown
            open={openSystem}
            overlayStyle={{ zIndex: 9999 }}
            menu={{
              items: itemsJobManagement,
            }}
          >
            <TextStyle onClick={(e) => e.preventDefault()}>
              {"Quản lý đầu việc"}
            </TextStyle>
          </Dropdown>
        </div>
      }
    </NavMenuContainer>
  );
};

export default MenuCustom;
